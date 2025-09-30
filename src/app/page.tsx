'use client';

import { Search, ShoppingBag, Heart, User, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

const mockProducts = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    brand: 'Nike',
    price: 150,
    originalPrice: 180,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    rating: 4.5,
    reviews: 1250,
    category: 'sneakers'
  },
  {
    id: 2,
    name: 'Clarks Desert Boot',
    brand: 'Clarks',
    price: 120,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    rating: 4.3,
    reviews: 890,
    category: 'boots'
  },
  {
    id: 3,
    name: 'Dr. Martens 1460',
    brand: 'Dr. Martens',
    price: 170,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    rating: 4.7,
    reviews: 2100,
    category: 'boots'
  },
  {
    id: 4,
    name: 'Adidas Ultraboost 22',
    brand: 'Adidas',
    price: 190,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    rating: 4.4,
    reviews: 1567,
    category: 'sneakers'
  },
  {
    id: 5,
    name: 'Converse Chuck Taylor',
    brand: 'Converse',
    price: 65,
    originalPrice: 80,
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    rating: 4.2,
    reviews: 3200,
    category: 'sneakers'
  },
  {
    id: 6,
    name: 'Timberland 6-Inch Premium',
    brand: 'Timberland',
    price: 200,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    rating: 4.6,
    reviews: 1890,
    category: 'boots'
  }
];

const categories = ['All', 'Sneakers', 'Boots', 'Dress Shoes', 'Sandals'];
const brands = ['Nike', 'Adidas', 'Clarks', 'Dr. Martens', 'Converse', 'Timberland'];
const priceRanges = ['Under $100', '$100-$150', '$150-$200', 'Over $200'];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);

  const filteredProducts = mockProducts.filter(product => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory.toLowerCase()) {
      return false;
    }
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    return true;
  });

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='bg-primary text-primary-foreground shadow-md sticky top-0 z-50'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-8'>
              <div className='text-2xl font-bold'>ShoeVault</div>
              <nav className='hidden md:flex space-x-6'>
                <a href='#' className='hover:text-accent transition-colors'>Men</a>
                <a href='#' className='hover:text-accent transition-colors'>Women</a>
                <a href='#' className='hover:text-accent transition-colors'>Kids</a>
                <a href='#' className='hover:text-accent transition-colors'>Brands</a>
                <a href='#' className='hover:text-accent transition-colors'>Sale</a>
              </nav>
            </div>

            <div className='flex items-center space-x-4'>
              <div className='relative hidden md:block'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <Input
                  placeholder='Search shoes...'
                  className='pl-10 w-64 bg-background text-foreground'
                />
              </div>
              <Button variant='ghost' size='sm' className='relative'>
                <Heart className='w-5 h-5' />
                <Badge className='absolute -top-2 -right-2 bg-accent text-accent-foreground'>2</Badge>
              </Button>
              <Button variant='ghost' size='sm' className='relative'>
                <ShoppingBag className='w-5 h-5' />
                <Badge className='absolute -top-2 -right-2 bg-accent text-accent-foreground'>1</Badge>
              </Button>
              <Button variant='ghost' size='sm'>
                <User className='w-5 h-5' />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className='flex'>
        {/* Sidebar Filters */}
        <aside className='w-64 bg-card border-r border-border p-6 hidden md:block'>
          <div className='space-y-6'>
            <div>
              <h3 className='font-semibold text-foreground mb-3'>Categories</h3>
              <div className='space-y-2'>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary text-foreground'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className='font-semibold text-foreground mb-3'>Brands</h3>
              <div className='space-y-2'>
                {brands.map((brand) => (
                  <div key={brand} className='flex items-center space-x-2'>
                    <Checkbox
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(selectedBrands.filter(b => b !== brand));
                        }
                      }}
                    />
                    <label htmlFor={brand} className='text-sm text-foreground cursor-pointer'>
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className='font-semibold text-foreground mb-3'>Price Range</h3>
              <div className='space-y-2'>
                {priceRanges.map((range) => (
                  <div key={range} className='flex items-center space-x-2'>
                    <Checkbox
                      id={range}
                      checked={priceRange.includes(range)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPriceRange([...priceRange, range]);
                        } else {
                          setPriceRange(priceRange.filter(r => r !== range));
                        }
                      }}
                    />
                    <label htmlFor={range} className='text-sm text-foreground cursor-pointer'>
                      {range}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className='flex-1 p-6'>
          {/* Hero Section */}
          <section className='bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-8 mb-8'>
            <div className='max-w-2xl'>
              <h1 className='text-4xl font-bold mb-4'>Walk Your Story</h1>
              <p className='text-xl mb-6 opacity-90'>
                Discover the perfect footwear for every step of your journey
              </p>
              <Button size='lg' className='bg-accent text-accent-foreground hover:bg-accent/90'>
                Shop New Arrivals
              </Button>
            </div>
          </section>

          {/* Mobile Filter Toggle */}
          <div className='md:hidden mb-4'>
            <Button variant='outline' size='sm'>
              <Filter className='w-4 h-4 mr-2' />
              Filters
            </Button>
          </div>

          {/* Product Grid */}
          <section>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold text-foreground'>Trending Now</h2>
              <p className='text-muted-foreground'>{filteredProducts.length} products</p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {filteredProducts.map((product) => (
                <Card key={product.id} className='group cursor-pointer hover:shadow-lg transition-shadow'>
                  <CardContent className='p-4'>
                    <div className='relative mb-4'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className='w-full h-48 object-cover rounded-md'
                      />
                      <Button
                        size='sm'
                        variant='secondary'
                        className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
                      >
                        <Heart className='w-4 h-4' />
                      </Button>
                      {product.originalPrice && (
                        <Badge className='absolute top-2 left-2 bg-destructive text-destructive-foreground'>
                          Sale
                        </Badge>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <h3 className='font-semibold text-foreground line-clamp-2'>{product.name}</h3>
                      <p className='text-sm text-muted-foreground'>{product.brand}</p>

                      <div className='flex items-center space-x-1'>
                        <div className='flex'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-accent fill-accent'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className='text-sm text-muted-foreground'>
                          ({product.reviews})
                        </span>
                      </div>

                      <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                          <span className='text-lg font-bold text-foreground'>
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className='text-sm text-muted-foreground line-through'>
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button size='sm' className='bg-primary hover:bg-primary/90'>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Free Shipping Banner */}
          <section className='mt-12 bg-secondary rounded-lg p-6 text-center'>
            <h3 className='text-xl font-bold text-foreground mb-2'>Free Shipping on All Orders Over $100</h3>
            <p className='text-muted-foreground'>Plus easy returns and size exchanges within 30 days</p>
          </section>
        </main>
      </div>
    </div>
  );
}