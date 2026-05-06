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
import { Plus, Edit, Trash2, Image as ImageIcon, Video, FileText, Upload } from 'lucide-react';
import { useProducts, Product } from '../../hooks/useProducts';
import { toast } from 'sonner';

interface ContentBlock {
  type: 'text' | 'image' | 'video';
  content: string;
  order: number;
  alt?: string;
  caption?: string;
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
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  });
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [bannerImages, setBannerImages] = useState<File[]>([]);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

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
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
    });
    setContentBlocks([]);
    setBannerImages([]);
    setGalleryImages([]);
    setVideos([]);
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

    // Files
    bannerImages.forEach((file, index) => {
      productFormData.append('bannerImages', file);
    });
    galleryImages.forEach((file, index) => {
      productFormData.append('galleryImages', file);
    });
    videos.forEach((file, index) => {
      productFormData.append('videos', file);
    });

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.slug, productFormData);
        toast.success('Product updated successfully');
      } else {
        await createProduct(productFormData);
        toast.success('Product created successfully');
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save product');
      console.error(error);
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
      seoTitle: product.seo.title || '',
      seoDescription: product.seo.description || '',
      seoKeywords: product.seo.keywords?.join(', ') || '',
    });
    setContentBlocks(product.description.content);
    setIsDialogOpen(true);
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
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
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
                      <FileText className="w-4 h-4 mr-2" />
                      Add Text
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addContentBlock('image')}>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Add Image
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addContentBlock('video')}>
                      <Video className="w-4 h-4 mr-2" />
                      Add Video
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {contentBlocks.map((block, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">{block.type}</Badge>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeContentBlock(index)}
                            >
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
                              <Input
                                placeholder="Image URL or upload path"
                                value={block.content}
                                onChange={(e) => updateContentBlock(index, { content: e.target.value })}
                              />
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
                                placeholder="Video URL or upload path"
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

                <TabsContent value="media" className="space-y-4">
                  <div>
                    <Label>Banner Images (Max 5)</Label>
                    <div className="mt-2">
                      <input
                        ref={bannerInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setBannerImages(Array.from(e.target.files || []))}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => bannerInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Banner Images
                      </Button>
                      {bannerImages.length > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {bannerImages.length} file(s) selected
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Gallery Images (Max 20)</Label>
                    <div className="mt-2">
                      <input
                        ref={galleryInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setGalleryImages(Array.from(e.target.files || []))}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => galleryInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Gallery Images
                      </Button>
                      {galleryImages.length > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {galleryImages.length} file(s) selected
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Videos (Max 5)</Label>
                    <div className="mt-2">
                      <input
                        ref={videoInputRef}
                        type="file"
                        multiple
                        accept="video/*"
                        onChange={(e) => setVideos(Array.from(e.target.files || []))}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => videoInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Videos
                      </Button>
                      {videos.length > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {videos.length} file(s) selected
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                  <div>
                    <Label htmlFor="seoTitle">SEO Title</Label>
                    <Input
                      id="seoTitle"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seoDescription">SEO Description</Label>
                    <Textarea
                      id="seoDescription"
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seoKeywords">SEO Keywords (comma separated)</Label>
                    <Input
                      id="seoKeywords"
                      value={formData.seoKeywords}
                      onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="material">Material</Label>
                      <Input
                        id="material"
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="care">Care Instructions</Label>
                      <Input
                        id="care"
                        value={formData.care}
                        onChange={(e) => setFormData({ ...formData, care: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dimensions">Dimensions</Label>
                      <Input
                        id="dimensions"
                        value={formData.dimensions}
                        onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight</Label>
                      <Input
                        id="weight"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Update Product' : 'Create Product'}
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