import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const NotificationsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [url, setUrl] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('webhooks').upsert({ user_id: user.id, url });
    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      toast({ title: 'Webhook Saved' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Notifications | RedFox Securities</title>
      </Helmet>
      <div className="max-w-2xl mx-auto">
        <Card className="bg-background/50 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="terminal-h2">Webhook Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url" className="font-mono text-primary">Webhook URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://hooks.slack.com/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="font-mono bg-input border-border focus:ring-primary focus:border-primary"
                />
              </div>
              <Button type="submit" className="w-full">Save</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NotificationsPage;
