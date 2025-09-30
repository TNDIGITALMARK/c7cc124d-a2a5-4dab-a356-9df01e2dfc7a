'use client';

import { ArrowLeft, Heart, Share, Star, Truck, RotateCcw, Shield, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const productData = {
  id: 1,
  name: 'Nike Air Max 270',
  brand: 'Nike',
  price: 150,
  originalPrice: 180,
  images: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
  ],
  rating: 4.5,
  reviewCount: 1250,
  inStock: true,
  description: 'The Nike Air Max 270 delivers visible Air cushioning in the heel and a sleek, modern design. Perfect for everyday wear and light athletic activities.',
  features: [
    'Max Air unit in heel for impact protection',
    'Breathable engineered mesh upper',
    'Durable rubber outsole with pivot points',
    'Comfortable foam midsole',
  ],
  sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
  reviews: [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      date: '2024-01-15',
      title: 'Perfect fit and super comfortable!',
      content: 'I ordered these based on the sizing guide and they fit perfectly. Very comfortable for all-day wear. The Air Max cushioning is amazing!',
      verified: true,
      size: '8.5'
    },
    {
      id: 2,
      author: 'Mike R.',
      rating: 4,
      date: '2024-01-10',
      title: 'Great shoes, runs slightly large',
      content: 'Love the design and comfort. I usually wear size 10 but 9.5 fits me better in this model. Would recommend sizing down half a size.',
      verified: true,
      size: '9.5'
    },
    {
      id: 3,
      author: 'Emma L.',
      rating: 5,
      date: '2024-01-08',
      title: 'Stylish and comfortable',
      content: 'These sneakers are perfect for both workouts and casual wear. The color is exactly as shown and quality is excellent.',
      verified: true,
      size: '7'
    }
  ]
};

const sizeGuide = {
  '6': { us: '6', eu: '36', cm: '24' },
  '6.5': { us: '6.5', eu: '37', cm: '24.5' },
  '7': { us: '7', eu: '38', cm: '25' },
  '7.5': { us: '7.5', eu: '38.5', cm: '25.5' },
  '8': { us: '8', eu: '39', cm: '26' },
  '8.5': { us: '8.5', eu: '40', cm: '26.5' },
  '9': { us: '9', eu: '41', cm: '27' },
  '9.5': { us: '9.5', eu: '42', cm: '27.5' },
  '10': { us: '10', eu: '43', cm: '28' },
  '10.5': { us: '10.5', eu: '44', cm: '28.5' },
  '11': { us: '11', eu: '45', cm: '29' },
  '11.5': { us: '11.5', eu: '46', cm: '29.5' },
  '12': { us: '12', eu: '47', cm: '30' }
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const ratingDistribution = [
    { stars: 5, count: 800, percentage: 64 },
    { stars: 4, count: 300, percentage: 24 },
    { stars: 3, count: 100, percentage: 8 },
    { stars: 2, count: 35, percentage: 3 },
    { stars: 1, count: 15, percentage: 1 }
  ];

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='bg-primary text-primary-foreground shadow-md sticky top-0 z-50'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => router.back()}
                className='text-primary-foreground hover:text-accent'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Back
              </Button>
              <div className='text-2xl font-bold'>ShoeVault</div>
            </div>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Product Images */}
          <div className='space-y-4'>
            <div className='aspect-square relative'>
              <img
                src={productData.images[selectedImage]}
                alt={productData.name}
                className='w-full h-full object-cover rounded-lg'
              />
              {productData.originalPrice && (
                <Badge className='absolute top-4 left-4 bg-destructive text-destructive-foreground'>
                  Sale
                </Badge>
              )}
            </div>

            <div className='flex space-x-2'>
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-md border-2 overflow-hidden ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${productData.name} ${index + 1}`}
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className='space-y-6'>
            <div>
              <p className='text-muted-foreground text-sm'>{productData.brand}</p>
              <h1 className='text-3xl font-bold text-foreground'>{productData.name}</h1>

              <div className='flex items-center space-x-4 mt-2'>
                <div className='flex items-center space-x-1'>
                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(productData.rating)
                            ? 'text-accent fill-accent'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className='text-sm text-muted-foreground'>
                    {productData.rating} ({productData.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className='flex items-center space-x-4'>
              <span className='text-3xl font-bold text-foreground'>${productData.price}</span>
              {productData.originalPrice && (
                <span className='text-xl text-muted-foreground line-through'>
                  ${productData.originalPrice}
                </span>
              )}
              {productData.originalPrice && (
                <Badge variant='destructive'>
                  Save ${productData.originalPrice - productData.price}
                </Badge>
              )}
            </div>

            {/* Size Selection */}
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-semibold text-foreground mb-2 block'>
                  Size (US)
                </label>
                <div className='grid grid-cols-6 gap-2'>
                  {productData.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 rounded-md border text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-gray-300 bg-background text-foreground hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <Button variant='outline' size='sm' className='w-full'>
                Size Guide & Fit Finder
              </Button>
            </div>

            {/* Quantity */}
            <div className='space-y-2'>
              <label className='text-sm font-semibold text-foreground'>Quantity</label>
              <div className='flex items-center space-x-3'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className='w-4 h-4' />
                </Button>
                <span className='text-foreground font-medium'>{quantity}</span>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className='w-4 h-4' />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className='space-y-3'>
              <Button
                size='lg'
                className='w-full bg-primary hover:bg-primary/90'
                disabled={!selectedSize}
              >
                Add to Cart - ${productData.price * quantity}
              </Button>
              <div className='flex space-x-3'>
                <Button variant='outline' size='lg' className='flex-1'>
                  <Heart className='w-4 h-4 mr-2' />
                  Wishlist
                </Button>
                <Button variant='outline' size='lg' className='flex-1'>
                  <Share className='w-4 h-4 mr-2' />
                  Share
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className='space-y-3 bg-secondary rounded-lg p-4'>
              <div className='flex items-center space-x-3'>
                <Truck className='w-5 h-5 text-accent' />
                <div>
                  <p className='text-sm font-medium text-foreground'>Free Shipping</p>
                  <p className='text-xs text-muted-foreground'>On orders over $100</p>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                <RotateCcw className='w-5 h-5 text-accent' />
                <div>
                  <p className='text-sm font-medium text-foreground'>30-Day Returns</p>
                  <p className='text-xs text-muted-foreground'>Free size exchanges</p>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                <Shield className='w-5 h-5 text-accent' />
                <div>
                  <p className='text-sm font-medium text-foreground'>Authenticity Guaranteed</p>
                  <p className='text-xs text-muted-foreground'>100% genuine products</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className='mt-12'>
          <Tabs defaultValue='description' className='w-full'>
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='description'>Description</TabsTrigger>
              <TabsTrigger value='sizing'>Sizing Guide</TabsTrigger>
              <TabsTrigger value='reviews'>Reviews ({productData.reviewCount})</TabsTrigger>
              <TabsTrigger value='shipping'>Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value='description' className='mt-6'>
              <Card>
                <CardContent className='p-6'>
                  <p className='text-foreground mb-4'>{productData.description}</p>
                  <h4 className='font-semibold text-foreground mb-3'>Key Features:</h4>
                  <ul className='space-y-2'>
                    {productData.features.map((feature, index) => (
                      <li key={index} className='flex items-start space-x-2'>
                        <span className='text-accent mt-1'>•</span>
                        <span className='text-foreground'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='sizing' className='mt-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Size Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='overflow-x-auto'>
                    <table className='w-full text-sm'>
                      <thead>
                        <tr className='border-b'>
                          <th className='text-left py-2'>US</th>
                          <th className='text-left py-2'>EU</th>
                          <th className='text-left py-2'>CM</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(sizeGuide).map(([size, measurements]) => (
                          <tr key={size} className='border-b'>
                            <td className='py-2'>{measurements.us}</td>
                            <td className='py-2'>{measurements.eu}</td>
                            <td className='py-2'>{measurements.cm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className='mt-6 p-4 bg-secondary rounded-lg'>
                    <h4 className='font-semibold text-foreground mb-2'>Fit Tips:</h4>
                    <ul className='text-sm text-muted-foreground space-y-1'>
                      <li>• Measure your foot in the afternoon when it's at its largest</li>
                      <li>• Leave about 0.5 inch (1.3 cm) between your longest toe and the shoe</li>
                      <li>• Consider the width of your foot - this model runs true to size</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='reviews' className='mt-6'>
              <div className='space-y-6'>
                {/* Rating Overview */}
                <Card>
                  <CardContent className='p-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='text-center'>
                        <div className='text-4xl font-bold text-foreground mb-2'>
                          {productData.rating}
                        </div>
                        <div className='flex justify-center mb-2'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(productData.rating)
                                  ? 'text-accent fill-accent'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className='text-muted-foreground'>
                          Based on {productData.reviewCount} reviews
                        </p>
                      </div>

                      <div className='space-y-2'>
                        {ratingDistribution.map((item) => (
                          <div key={item.stars} className='flex items-center space-x-3'>
                            <span className='text-sm w-8'>{item.stars}★</span>
                            <Progress value={item.percentage} className='flex-1' />
                            <span className='text-sm text-muted-foreground w-12'>
                              {item.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                <div className='space-y-4'>
                  {productData.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className='p-6'>
                        <div className='flex items-start space-x-4'>
                          <Avatar>
                            <AvatarFallback>
                              {review.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className='flex-1 space-y-2'>
                            <div className='flex items-center justify-between'>
                              <div>
                                <p className='font-semibold text-foreground'>{review.author}</p>
                                <div className='flex items-center space-x-2'>
                                  <div className='flex'>
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < review.rating
                                            ? 'text-accent fill-accent'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  {review.verified && (
                                    <Badge variant='secondary' className='text-xs'>
                                      Verified Purchase
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className='text-right'>
                                <p className='text-sm text-muted-foreground'>{review.date}</p>
                                <p className='text-xs text-muted-foreground'>Size: {review.size}</p>
                              </div>
                            </div>
                            <h4 className='font-medium text-foreground'>{review.title}</h4>
                            <p className='text-muted-foreground'>{review.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value='shipping' className='mt-6'>
              <Card>
                <CardContent className='p-6'>
                  <div className='space-y-6'>
                    <div>
                      <h4 className='font-semibold text-foreground mb-3'>Shipping Options</h4>
                      <div className='space-y-3'>
                        <div className='flex justify-between'>
                          <span className='text-foreground'>Standard Shipping (5-7 business days)</span>
                          <span className='text-accent font-semibold'>FREE over $100</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-foreground'>Express Shipping (2-3 business days)</span>
                          <span className='text-foreground'>$9.99</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-foreground'>Next Day Delivery</span>
                          <span className='text-foreground'>$19.99</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className='font-semibold text-foreground mb-3'>Returns & Exchanges</h4>
                      <ul className='space-y-2 text-muted-foreground'>
                        <li>• 30-day return policy</li>
                        <li>• Free size exchanges within 30 days</li>
                        <li>• Items must be in original condition</li>
                        <li>• Return shipping is free for defective items</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}