import React from 'react';
import { Helmet } from 'react-helmet';
import { useWorkspaces } from '@/contexts/WorkspaceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WorkspacesPage = () => {
  const { workspaces } = useWorkspaces();

  return (
    <>
      <Helmet>
        <title>Workspaces | RedFox Securities</title>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <Card className="bg-background/50 border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="terminal-h2">Your Workspaces</CardTitle>
          </CardHeader>
          <CardContent>
            {workspaces.length === 0 && (
              <p className="text-muted-foreground">No workspaces yet.</p>
            )}
            {workspaces.length > 0 && (
              <ul className="space-y-2">
                {workspaces.map(ws => (
                  <li key={ws.id} className="font-mono text-primary">
                    {ws.name}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default WorkspacesPage;
