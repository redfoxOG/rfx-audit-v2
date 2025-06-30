import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

export const useScanStatus = (scanId) => {
    const [status, setStatus] = useState('PENDING');
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    const pollStatus = useCallback(async () => {
        if (!scanId) return;

        try {
            const { data: scanData, error: scanError } = await supabase
                .from('scans')
                .select('status, progress')
                .eq('id', scanId)
                .single();

            if (scanError && scanError.code !== 'PGRST116') { // Ignore 'no rows' error initially
                throw scanError;
            }

            const { data: logsData, error: logsError } = await supabase
                .from('scan_logs')
                .select('log_message')
                .eq('scan_id', scanId)
                .order('created_at', { ascending: true });

            if (logsError) {
                throw logsError;
            }

            if (scanData) {
                if (scanData.status === 'DONE' && status !== 'DONE') {
                    toast({
                        title: "Scan Complete",
                        description: "Your security audit report is ready for download.",
                    });
                }
                setStatus(scanData.status);
                setProgress(scanData.progress);
            }

            if (logsData) {
                setLogs(logsData.map(l => l.log_message));
            }

        } catch (err) {
            setError('Failed to fetch scan status. Please try again later.');
            setStatus('ERROR');
            console.error(err);
        }
    }, [scanId, toast, status]);

    useEffect(() => {
        if (!scanId || status === 'DONE' || status === 'ERROR') {
            return;
        }

        const interval = setInterval(pollStatus, 3000);

        return () => clearInterval(interval);

    }, [scanId, status, pollStatus]);

    // Realtime subscription for logs
    useEffect(() => {
        if (!scanId) return;

        const channel = supabase.channel(`scan-logs:${scanId}`)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'scan_logs', filter: `scan_id=eq.${scanId}` },
                (payload) => {
                    setLogs(currentLogs => [...currentLogs, payload.new.log_message]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };

    }, [scanId]);


    return { status, progress, logs, error };
};