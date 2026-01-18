'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase, Booking } from '@/lib/supabase';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Check } from 'lucide-react';
import { format } from 'date-fns';

type BookingDialogProps = {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   bookingType: 'tour' | 'hotel' | 'airbnb';
   itemId: string;
   itemName: string;
   pricePerUnit: number;
   durationDays?: number;
 };

export function BookingDialog({
  open,
  onOpenChange,
  bookingType,
  itemId,
  itemName,
  pricePerUnit,
  durationDays = 1,
}: BookingDialogProps) {
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    guest_country: '',
    number_of_guests: 1,
    special_requests: '',
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const calculateTotalPrice = () => {
     if (!startDate || !endDate) return 0;
     const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
     if (bookingType === 'tour') {
       return pricePerUnit * formData.number_of_guests;
     } else {
       return pricePerUnit * days * formData.number_of_guests;
     }
   };

  const calculateDeposit = () => {
    return Math.round(calculateTotalPrice() * 0.5);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    setLoading(true);

    const booking: Booking = {
       booking_type: bookingType,
       item_id: itemId,
       ...formData,
       start_date: format(startDate, 'yyyy-MM-dd'),
       end_date: format(endDate, 'yyyy-MM-dd'),
       total_price: calculateTotalPrice(),
       deposit_amount: calculateDeposit(),
     };

    const { error } = await supabase.from('bookings').insert([booking]);

    setLoading(false);

    if (!error) {
       // Send WhatsApp message
       const whatsappMessage = encodeURIComponent(
         `New Booking Request!\n\n` +
         `Customer: ${formData.guest_name}\n` +
         `Email: ${formData.guest_email}\n` +
         `Phone: ${formData.guest_phone}\n` +
         `Country: ${formData.guest_country}\n` +
         `Guests: ${formData.number_of_guests}\n` +
         `Booking: ${itemName} (${bookingType})\n` +
         `Dates: ${format(startDate!, 'PPP')} - ${format(endDate!, 'PPP')}\n` +
         `Total Price: $ ${calculateTotalPrice().toLocaleString()}\n` +
         `Deposit Required: $ ${calculateDeposit().toLocaleString()}\n` +
         `M-Pesa Paybill: 222111\n` +
         `Account Number: 2321644\n` +
         `${formData.special_requests ? `Special Requests: ${formData.special_requests}\n` : ''}` +
         `\nPlease confirm this booking.`
       );

       // Basuba Adventures WhatsApp number
       const whatsappNumber = '+254702612666';
       const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

       window.open(whatsappUrl, '_blank');

       setSuccess(true);
       setTimeout(() => {
         setSuccess(false);
         onOpenChange(false);
         setFormData({
           guest_name: '',
           guest_email: '',
           guest_phone: '',
           guest_country: '',
           number_of_guests: 1,
           special_requests: '',
         });
         setStartDate(undefined);
         setEndDate(undefined);
       }, 3000);
     }
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date && bookingType === 'tour' && durationDays) {
      const end = new Date(date);
      end.setDate(end.getDate() + durationDays);
      setEndDate(end);
    }
  };

  if (success) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600">
              Thank you for your booking. We&apos;ll contact you shortly at {formData.guest_email} to confirm details.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book {itemName}</DialogTitle>
          <DialogDescription>
            Fill in your details to complete your booking. We&apos;ll contact you to confirm.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guest_name">Full Name *</Label>
              <Input
                id="guest_name"
                required
                value={formData.guest_name}
                onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guest_email">Email *</Label>
              <Input
                id="guest_email"
                type="email"
                required
                value={formData.guest_email}
                onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guest_phone">Phone Number *</Label>
              <Input
                id="guest_phone"
                type="tel"
                required
                value={formData.guest_phone}
                onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guest_country">Country *</Label>
              <Input
                id="guest_country"
                required
                value={formData.guest_country}
                onChange={(e) => setFormData({ ...formData, guest_country: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="number_of_guests">Number of Guests *</Label>
              <Input
                id="number_of_guests"
                type="number"
                min="1"
                required
                value={formData.number_of_guests}
                onChange={(e) => setFormData({ ...formData, number_of_guests: parseInt(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {(bookingType === 'hotel' || bookingType === 'airbnb') && (
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => !startDate || date <= startDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="special_requests">Special Requests</Label>
            <Textarea
              id="special_requests"
              rows={3}
              placeholder="Any dietary requirements, accessibility needs, or special requests..."
              value={formData.special_requests}
              onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
            />
          </div>

          {startDate && endDate && (
             <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-lg font-semibold text-gray-900">Total Price:</span>
                 <span className="text-2xl font-bold text-amber-600">
                   $ {calculateTotalPrice().toLocaleString()}
                 </span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-lg font-semibold text-gray-900">Required Deposit (50%):</span>
                 <span className="text-xl font-bold text-red-600">
                   $ {calculateDeposit().toLocaleString()}
                 </span>
               </div>
               <p className="text-sm text-gray-600">
                 {formData.number_of_guests} guest{formData.number_of_guests > 1 ? 's' : ''}
                 {bookingType === 'hotel' || bookingType === 'airbnb' ?
                   ` × ${Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} night${
                     Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) > 1 ? 's' : ''
                   }` : ''
                 }
               </p>
               <div className="bg-white border border-amber-300 rounded-lg p-3">
                 <p className="text-sm text-amber-800">
                   <strong>Deposit Policy:</strong> A 50% deposit is required to confirm your booking. The remaining balance is due upon arrival.
                 </p>
               </div>
               <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                 <p className="text-sm text-green-800">
                   <strong>Payment Information:</strong><br />
                   M-Pesa Paybill: <strong>222111</strong><br />
                   Account Number: <strong>2321644</strong>
                 </p>
               </div>
             </div>
           )}

          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" size="lg" disabled={loading || !startDate || !endDate}>
            {loading ? 'Processing...' : 'Confirm Booking'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
