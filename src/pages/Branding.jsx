import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const BrandingPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const { error } = await supabase.storage.from('branding').upload(`${user.id}/logo.png`, file, { upsert: true });
    if (error) {
      toast({ variant: 'destructive', title: 'Upload Failed', description: error.message });
    } else {
      toast({ title: 'Branding Updated' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Report Branding | RedFox Securities</title>
      </Helmet>
      <div className="max-w-xl mx-auto">
        <Card className="bg-background/50 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="terminal-h2">Custom Report Branding</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo" className="font-mono text-primary">Logo Image</Label>
                <Input id="logo" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
              </div>
              <Button type="submit" className="w-full">Upload</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default BrandingPage;
