import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, Image as ImageIcon, Video, FileText, Upload, Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import { useProducts, Product } from '../../hooks/useProducts';
import { toast } from 'sonner';

interface ContentBlock {
  type: 'text' | 'image' | 'video';
  content: string;
  order: number;
  alt?: string;
  caption?: string;
  file?: File;
  preview?: string;
}

interface ImageItem {
  id: string;
  file?: File;
  url?: string;   // existing image URL (when editing)
  preview: string;
  order: number;
}

export function ProductManager() {
  const { products, loading, createProduct, updateProduct, deleteProduct } = useProducts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    price: '',
    originalPrice: '',
    inStock: true,
    featured: false,
    tags: '',
    material: '',
    care: '',
    dimensions: '',
    weight: '',
    manufacturerName: '',
    manufacturerOrigin: '',
    manufacturerArtisan: '',
    manufacturerWorkshop: '',
    manufacturerCraftTradition: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  });
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [bannerImages, setBannerImages] = useState<ImageItem[]>([]);
  const [galleryImages, setGalleryImages] = useState<ImageItem[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [removedImageUrls, setRemovedImageUrls] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      category: '',
      price: '',
      originalPrice: '',
      inStock: true,
      featured: false,
      tags: '',
      material: '',
      care: '',
      dimensions: '',
      weight: '',
      manufacturerName: '',
      manufacturerOrigin: '',
      manufacturerArtisan: '',
      manufacturerWorkshop: '',
      manufacturerCraftTradition: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
    });
    setContentBlocks([]);
    setBannerImages([]);
    setGalleryImages([]);
    setVideos([]);
    setRemovedImageUrls([]);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productFormData = new FormData();

    // Basic product data
    productFormData.append('name', formData.name);
    productFormData.append('slug', formData.slug);
    productFormData.append('category', formData.category);
    if (formData.price) productFormData.append('price', formData.price);
    if (formData.originalPrice) productFormData.append('originalPrice', formData.originalPrice);
    productFormData.append('inStock', formData.inStock.toString());
    productFormData.append('featured', formData.featured.toString());

    // Description content
    productFormData.append('description', JSON.stringify({ content: contentBlocks }));

    // Metadata
    productFormData.append('metadata', JSON.stringify({
      material: formData.material,
      care: formData.care,
      dimensions: formData.dimensions,
      weight: formData.weight,
    }));

    // Manufacturers
    productFormData.append('manufacturers', JSON.stringify({
      name: formData.manufacturerName,
      origin: formData.manufacturerOrigin,
      artisan: formData.manufacturerArtisan,
      workshop: formData.manufacturerWorkshop,
      craftTradition: formData.manufacturerCraftTradition,
    }));

    // Tags
    const tagsArray = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    productFormData.append('tags', JSON.stringify(tagsArray));

    // SEO
    const keywordsArray = formData.seoKeywords ? formData.seoKeywords.split(',').map(k => k.trim()).filter(Boolean) : [];
    productFormData.append('seo', JSON.stringify({
      title: formData.seoTitle,
      description: formData.seoDescription,
      keywords: keywordsArray,
    }));

    // Files — only new uploads
    bannerImages.filter(i => i.file).forEach(i => productFormData.append('bannerImages', i.file!));
    galleryImages.filter(i => i.file).forEach(i => productFormData.append('galleryImages', i.file!));
    videos.forEach(file => productFormData.append('videos', file));

    // Existing image order (urls in desired order)
    const bannerOrder = bannerImages.map(i => i.url || '').filter(Boolean);
    const galleryOrder = galleryImages.map(i => i.url || '').filter(Boolean);
    if (bannerOrder.length) productFormData.append('bannerImageOrder', JSON.stringify(bannerOrder));
    if (galleryOrder.length) productFormData.append('galleryImageOrder', JSON.stringify(galleryOrder));
    if (removedImageUrls.length) productFormData.append('removedImages', JSON.stringify(removedImageUrls));

    // Content block files
    contentBlocks.forEach((block, index) => {
      if (block.type === 'image' && block.file) {
        productFormData.append(`contentImage_${index}`, block.file);
      }
    });

    setSubmitting(true);
    setProgress(10);
    setProgressLabel('Preparing data...');
    try {
      setProgress(30);
      setProgressLabel(bannerImages.length || galleryImages.length ? 'Uploading images...' : 'Saving product...');
      if (editingProduct) {
        setProgress(60);
        setProgressLabel('Updating product...');
        await updateProduct(editingProduct.slug, productFormData);
      } else {
        setProgress(60);
        setProgressLabel('Creating product...');
        await createProduct(productFormData);
      }
      setProgress(100);
      setProgressLabel('Done!');
      toast.success(editingProduct ? 'Product updated successfully' : 'Product created successfully');
      setTimeout(() => {
        setIsDialogOpen(false);
        resetForm();
        setProgress(0);
        setProgressLabel('');
        setSubmitting(false);
      }, 500);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save product');
      console.error(error);
      setProgress(0);
      setProgressLabel('');
      setSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price?.toString() || '',
      originalPrice: product.originalPrice?.toString() || '',
      inStock: product.inStock,
      featured: product.featured,
      tags: product.tags.join(', '),
      material: product.metadata.material || '',
      care: product.metadata.care || '',
      dimensions: product.metadata.dimensions || '',
      weight: product.metadata.weight || '',
      manufacturerName: (product as any).manufacturers?.name || '',
      manufacturerOrigin: (product as any).manufacturers?.origin || '',
      manufacturerArtisan: (product as any).manufacturers?.artisan || '',
      manufacturerWorkshop: (product as any).manufacturers?.workshop || '',
      manufacturerCraftTradition: (product as any).manufacturers?.craftTradition || '',
      seoTitle: product.seo.title || '',
      seoDescription: product.seo.description || '',
      seoKeywords: product.seo.keywords?.join(', ') || '',
    });
    setContentBlocks(product.description.content.map(b => ({ ...b, preview: undefined, file: undefined })));
    // Populate existing images as ImageItems
    const banners: ImageItem[] = (product.images || [])
      .filter((img: any) => img.type === 'banner')
      .map((img: any, i: number) => ({ id: `existing-banner-${i}`, url: img.url, preview: img.url, order: i }));
    const gallery: ImageItem[] = (product.images || [])
      .filter((img: any) => img.type === 'gallery')
      .map((img: any, i: number) => ({ id: `existing-gallery-${i}`, url: img.url, preview: img.url, order: i }));
    setBannerImages(banners);
    setGalleryImages(gallery);
    setRemovedImageUrls([]);
    setIsDialogOpen(true);
  };

  const addImagesToList = (files: File[], setter: React.Dispatch<React.SetStateAction<ImageItem[]>>) => {
    setter(prev => [
      ...prev,
      ...files.map((file, i) => ({
        id: `new-${Date.now()}-${i}`,
        file,
        preview: URL.createObjectURL(file),
        order: prev.length + i,
      })),
    ]);
  };

  const moveImage = (list: ImageItem[], setter: React.Dispatch<React.SetStateAction<ImageItem[]>>, index: number, dir: -1 | 1) => {
    const next = [...list];
    const swap = index + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[index], next[swap]] = [next[swap], next[index]];
    setter(next.map((item, i) => ({ ...item, order: i })));
  };

  const removeImage = (list: ImageItem[], setter: React.Dispatch<React.SetStateAction<ImageItem[]>>, index: number) => {
    const item = list[index];
    if (item.url) setRemovedImageUrls(prev => [...prev, item.url!]);
    setter(list.filter((_, i) => i !== index).map((item, i) => ({ ...item, order: i })));
  };

  const addContentBlock = (type: 'text' | 'image' | 'video') => {
    const newBlock: ContentBlock = {
      type,
      content: '',
      order: contentBlocks.length,
    };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const updateContentBlock = (index: number, updates: Partial<ContentBlock>) => {
    const updated = [...contentBlocks];
    updated[index] = { ...updated[index], ...updates };
    setContentBlocks(updated);
  };

  const removeContentBlock = (index: number) => {
    setContentBlocks(contentBlocks.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Products ({products.length})</h3>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Create New Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => {
                          const name = e.target.value;
                          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                          setFormData({ ...formData, name, slug: editingProduct ? formData.slug : slug });
                        }}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="originalPrice">Original Price</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="inStock"
                        checked={formData.inStock}
                        onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
                      />
                      <Label htmlFor="inStock">In Stock</Label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                    <Label htmlFor="featured">Featured Product</Label>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <Button type="button" variant="outline" size="sm" onClick={() => addContentBlock('text')}>
                      <FileText className="w-4 h-4 mr-2" />Add Text
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addContentBlock('image')}>
                      <ImageIcon className="w-4 h-4 mr-2" />Add Image
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addContentBlock('video')}>
                      <Video className="w-4 h-4 mr-2" />Add Video
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {contentBlocks.map((block, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">{block.type}</Badge>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeContentBlock(index)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {block.type === 'text' && (
                            <Textarea
                              placeholder="Enter text content..."
                              value={block.content}
                              onChange={(e) => updateContentBlock(index, { content: e.target.value })}
                            />
                          )}
                          {block.type === 'image' && (
                            <>
                              <div className="flex items-center gap-2">
                                <input
                                  id={`cb-img-${index}`}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    updateContentBlock(index, { file, preview: URL.createObjectURL(file), content: file.name });
                                  }}
                                />
                                <Button type="button" variant="outline" size="sm"
                                  onClick={() => document.getElementById(`cb-img-${index}`)?.click()}>
                                  <Upload className="w-4 h-4 mr-1" />Upload Image
                                </Button>
                                {block.preview && (
                                  <img src={block.preview} alt="preview" className="h-12 w-12 object-cover rounded border" />
                                )}
                                {!block.preview && block.content && (
                                  <span className="text-xs text-muted-foreground truncate max-w-[160px]">{block.content}</span>
                                )}
                              </div>
                              <Input
                                placeholder="Alt text"
                                value={block.alt || ''}
                                onChange={(e) => updateContentBlock(index, { alt: e.target.value })}
                              />
                              <Input
                                placeholder="Caption (optional)"
                                value={block.caption || ''}
                                onChange={(e) => updateContentBlock(index, { caption: e.target.value })}
                              />
                            </>
                          )}
                          {block.type === 'video' && (
                            <>
                              <Input
                                placeholder="Video URL"
                                value={block.content}
                                onChange={(e) => updateContentBlock(index, { content: e.target.value })}
                              />
                              <Input
                                placeholder="Caption (optional)"
                                value={block.caption || ''}
                                onChange={(e) => updateContentBlock(index, { caption: e.target.value })}
                              />
                            </>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="media" className="space-y-6">
                  {/* Banner Images */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Banner Images (Max 5)</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => bannerInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-1" />Add
                      </Button>
                    </div>
                    <input ref={bannerInputRef} type="file" multiple accept="image/*" className="hidden"
                      onChange={(e) => addImagesToList(Array.from(e.target.files || []), setBannerImages)} />
                    {bannerImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {bannerImages.map((item, i) => (
                          <div key={item.id} className="relative border rounded-lg overflow-hidden group">
                            <img src={item.preview} alt={`banner-${i}`} className="w-full h-24 object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                              <Button type="button" size="sm" variant="secondary" className="h-7 w-7 p-0"
                                onClick={() => moveImage(bannerImages, setBannerImages, i, -1)} disabled={i === 0}>
                                <ArrowUp className="w-3 h-3" />
                              </Button>
                              <Button type="button" size="sm" variant="secondary" className="h-7 w-7 p-0"
                                onClick={() => moveImage(bannerImages, setBannerImages, i, 1)} disabled={i === bannerImages.length - 1}>
                                <ArrowDown className="w-3 h-3" />
                              </Button>
                              <Button type="button" size="sm" variant="destructive" className="h-7 w-7 p-0"
                                onClick={() => removeImage(bannerImages, setBannerImages, i)}>
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                            <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">{i + 1}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Gallery Images */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Gallery Images (Max 20)</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => galleryInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-1" />Add
                      </Button>
                    </div>
                    <input ref={galleryInputRef} type="file" multiple accept="image/*" className="hidden"
                      onChange={(e) => addImagesToList(Array.from(e.target.files || []), setGalleryImages)} />
                    {galleryImages.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        {galleryImages.map((item, i) => (
                          <div key={item.id} className="relative border rounded-lg overflow-hidden group">
                            <img src={item.preview} alt={`gallery-${i}`} className="w-full h-20 object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                              <Button type="button" size="sm" variant="secondary" className="h-6 w-6 p-0"
                                onClick={() => moveImage(galleryImages, setGalleryImages, i, -1)} disabled={i === 0}>
                                <ArrowUp className="w-3 h-3" />
                              </Button>
                              <Button type="button" size="sm" variant="secondary" className="h-6 w-6 p-0"
                                onClick={() => moveImage(galleryImages, setGalleryImages, i, 1)} disabled={i === galleryImages.length - 1}>
                                <ArrowDown className="w-3 h-3" />
                              </Button>
                              <Button type="button" size="sm" variant="destructive" className="h-6 w-6 p-0"
                                onClick={() => removeImage(galleryImages, setGalleryImages, i)}>
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                            <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">{i + 1}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Videos */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Videos (Max 5)</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => videoInputRef.current?.click()}>
                        <Upload className="w-4 h-4 mr-1" />Add
                      </Button>
                    </div>
                    <input ref={videoInputRef} type="file" multiple accept="video/*" className="hidden"
                      onChange={(e) => setVideos(prev => [...prev, ...Array.from(e.target.files || [])])} />
                    {videos.length > 0 && (
                      <div className="space-y-1">
                        {videos.map((v, i) => (
                          <div key={i} className="flex items-center justify-between text-sm border rounded px-3 py-1.5">
                            <span className="truncate max-w-[260px]">{v.name}</span>
                            <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0"
                              onClick={() => setVideos(videos.filter((_, vi) => vi !== i))}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="specs" className="space-y-4">
                  <p className="text-sm font-medium text-muted-foreground">Specifications</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="material">Material</Label>
                      <Input id="material" value={formData.material} onChange={(e) => setFormData({ ...formData, material: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="care">Care Instructions</Label>
                      <Input id="care" value={formData.care} onChange={(e) => setFormData({ ...formData, care: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dimensions">Dimensions</Label>
                      <Input id="dimensions" value={formData.dimensions} onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight</Label>
                      <Input id="weight" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground pt-4">Manufacturers</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="manufacturerName">Manufacturer Name</Label>
                      <Input id="manufacturerName" value={formData.manufacturerName} onChange={(e) => setFormData({ ...formData, manufacturerName: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="manufacturerOrigin">Origin</Label>
                      <Input id="manufacturerOrigin" value={formData.manufacturerOrigin} onChange={(e) => setFormData({ ...formData, manufacturerOrigin: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="manufacturerArtisan">Artisan</Label>
                      <Input id="manufacturerArtisan" value={formData.manufacturerArtisan} onChange={(e) => setFormData({ ...formData, manufacturerArtisan: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="manufacturerWorkshop">Workshop</Label>
                      <Input id="manufacturerWorkshop" value={formData.manufacturerWorkshop} onChange={(e) => setFormData({ ...formData, manufacturerWorkshop: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="manufacturerCraftTradition">Craft Tradition</Label>
                    <Input id="manufacturerCraftTradition" value={formData.manufacturerCraftTradition} onChange={(e) => setFormData({ ...formData, manufacturerCraftTradition: e.target.value })} />
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                  <div>
                    <Label htmlFor="seoTitle">SEO Title</Label>
                    <Input id="seoTitle" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="seoDescription">SEO Description</Label>
                    <Textarea id="seoDescription" value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="seoKeywords">SEO Keywords (comma separated)</Label>
                    <Input id="seoKeywords" value={formData.seoKeywords} onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })} />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Progress bar */}
              {submitting && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{progressLabel}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%`, background: 'var(--primary)' }}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={submitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} className="min-w-[160px]">
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {editingProduct ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    editingProduct ? 'Update Product' : 'Create Product'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {products.map((product) => (
          <Card key={product._id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">/{product.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  {product.featured && <Badge>Featured</Badge>}
                  {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{product.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteProduct(product.slug)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Category:</span> {product.category}
                </div>
                <div>
                  <span className="font-medium">Price:</span> ${product.price || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Images:</span> {product.images.length}
                </div>
                <div>
                  <span className="font-medium">Videos:</span> {product.videos?.length || 0}
                </div>
              </div>
              {product.tags.length > 0 && (
                <div className="mt-3">
                  <span className="font-medium text-sm">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}