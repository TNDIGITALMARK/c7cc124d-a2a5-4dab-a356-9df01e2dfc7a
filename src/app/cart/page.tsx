'use client';

import { ArrowLeft, Minus, Plus, Trash2, Heart, ShoppingBag, CreditCard, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const cartItems = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    brand: 'Nike',
    price: 150,
    originalPrice: 180,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    size: '9',
    quantity: 1,
    inStock: true
  },
  {
    id: 2,
    name: 'Clarks Desert Boot',
    brand: 'Clarks',
    price: 120,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    size: '8.5',
    quantity: 1,
    inStock: true
  }
];

const favoriteItems = [
  {
    id: 3,
    name: 'Dr. Martens 1460',
    brand: 'Dr. Martens',
    price: 170,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    inStock: true
  },
  {
    id: 4,
    name: 'Converse Chuck Taylor',
    brand: 'Converse',
    price: 65,
    originalPrice: 80,
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    inStock: true
  }
];

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState(cartItems);
  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter(item => item.id !== id));
    } else {
      setItems(items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = items.reduce((sum, item) =>
    sum + ((item.originalPrice || item.price) - item.price) * item.quantity, 0
  );
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className='min-h-screen bg-background'>
        {/* Header */}
        <header className='bg-primary text-primary-foreground shadow-md sticky top-0 z-50'>
          <div className='container mx-auto px-4 py-4'>
            <div className='flex items-center space-x-4'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => router.push('/')}
                className='text-primary-foreground hover:text-accent'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Continue Shopping
              </Button>
              <div className='text-2xl font-bold'>ShoeVault</div>
            </div>
          </div>
        </header>

        <div className='container mx-auto px-4 py-16 text-center'>
          <ShoppingBag className='w-24 h-24 mx-auto text-muted-foreground mb-6' />
          <h1 className='text-3xl font-bold text-foreground mb-4'>Your cart is empty</h1>
          <p className='text-muted-foreground mb-8'>Start shopping to add items to your cart</p>
          <Button
            size='lg'
            className='bg-primary hover:bg-primary/90'
            onClick={() => router.push('/')}
          >
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='bg-primary text-primary-foreground shadow-md sticky top-0 z-50'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center space-x-4'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => router.push('/')}
              className='text-primary-foreground hover:text-accent'
            >
              <ArrowLeft className='w-4 h-4 mr-2' />
              Continue Shopping
            </Button>
            <div className='text-2xl font-bold'>ShoeVault</div>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-2 space-y-6'>
            <div className='flex items-center justify-between'>
              <h1 className='text-3xl font-bold text-foreground'>Shopping Cart</h1>
              <p className='text-muted-foreground'>{items.length} items</p>
            </div>

            <Card>
              <CardContent className='p-6'>
                <div className='space-y-6'>
                  {items.map((item, index) => (
                    <div key={item.id}>
                      <div className='flex items-center space-x-4'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-20 h-20 object-cover rounded-md'
                        />

                        <div className='flex-1 space-y-2'>
                          <div className='flex items-start justify-between'>
                            <div>
                              <h3 className='font-semibold text-foreground'>{item.name}</h3>
                              <p className='text-sm text-muted-foreground'>{item.brand}</p>
                              <p className='text-sm text-muted-foreground'>Size: {item.size}</p>
                              {item.originalPrice && (
                                <Badge className='bg-destructive text-destructive-foreground'>
                                  Save ${item.originalPrice - item.price}
                                </Badge>
                              )}
                            </div>

                            <div className='text-right'>
                              <div className='flex items-center space-x-2'>
                                <span className='text-lg font-bold text-foreground'>
                                  ${item.price}
                                </span>
                                {item.originalPrice && (
                                  <span className='text-sm text-muted-foreground line-through'>
                                    ${item.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-3'>
                              <Button
                                variant='outline'
                                size='sm'
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className='w-4 h-4' />
                              </Button>
                              <span className='text-foreground font-medium'>{item.quantity}</span>
                              <Button
                                variant='outline'
                                size='sm'
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className='w-4 h-4' />
                              </Button>
                            </div>

                            <div className='flex items-center space-x-2'>
                              <Button
                                variant='ghost'
                                size='sm'
                                className='text-muted-foreground hover:text-accent'
                              >
                                <Heart className='w-4 h-4' />
                              </Button>
                              <Button
                                variant='ghost'
                                size='sm'
                                onClick={() => removeItem(item.id)}
                                className='text-muted-foreground hover:text-destructive'
                              >
                                <Trash2 className='w-4 h-4' />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {index < items.length - 1 && <Separator className='mt-6' />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Favorites Section */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Heart className='w-5 h-5 text-accent' />
                  <span>Your Favorites</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  {favoriteItems.map((item) => (
                    <div key={item.id} className='text-center space-y-2'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-full h-32 object-cover rounded-md'
                      />
                      <div>
                        <h4 className='text-sm font-medium text-foreground line-clamp-2'>
                          {item.name}
                        </h4>
                        <div className='flex items-center justify-center space-x-2'>
                          <span className='text-sm font-bold text-foreground'>${item.price}</span>
                          {item.originalPrice && (
                            <span className='text-xs text-muted-foreground line-through'>
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button size='sm' variant='outline' className='mt-2 w-full'>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex justify-between text-foreground'>
                  <span>Subtotal ({items.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {savings > 0 && (
                  <div className='flex justify-between text-destructive'>
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}

                <div className='flex justify-between text-foreground'>
                  <span className='flex items-center space-x-2'>
                    <Truck className='w-4 h-4' />
                    <span>Shipping</span>
                  </span>
                  <span>
                    {shipping === 0 ? (
                      <span className='text-accent font-semibold'>FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className='flex justify-between text-foreground'>
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className='flex justify-between text-lg font-bold text-foreground'>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {subtotal < 100 && (
                  <div className='bg-accent/10 border border-accent/20 rounded-lg p-3'>
                    <p className='text-sm text-accent'>
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardContent className='p-4'>
                <div className='space-y-3'>
                  <Label htmlFor='promo' className='text-sm font-semibold'>
                    Promo Code
                  </Label>
                  <div className='flex space-x-2'>
                    <Input
                      id='promo'
                      placeholder='Enter code'
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant='outline'>Apply</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Button size='lg' className='w-full bg-primary hover:bg-primary/90'>
              <CreditCard className='w-4 h-4 mr-2' />
              Proceed to Checkout
            </Button>

            {/* Security Info */}
            <div className='bg-secondary rounded-lg p-4 text-center'>
              <p className='text-sm text-muted-foreground mb-2'>
                🔒 Secure checkout with 256-bit SSL encryption
              </p>
              <div className='flex justify-center space-x-4 text-xs text-muted-foreground'>
                <span>Visa</span>
                <span>Mastercard</span>
                <span>PayPal</span>
                <span>Apple Pay</span>
              </div>
            </div>

            {/* Return Policy */}
            <div className='bg-accent/10 border border-accent/20 rounded-lg p-4'>
              <h4 className='font-semibold text-foreground mb-2'>30-Day Return Policy</h4>
              <p className='text-sm text-muted-foreground'>
                Not satisfied? Return your shoes within 30 days for a full refund.
                Size exchanges are always free!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}