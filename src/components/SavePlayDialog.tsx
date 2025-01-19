import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SavePlayDialogProps {
  isOpen: boolean;
  onClose: () => void;
  canvasData: any;
  keyframesData: any;
  onVideoRecorded: () => Promise<Blob | undefined>;
}

const SavePlayDialog: React.FC<SavePlayDialogProps> = ({
  isOpen,
  onClose,
  canvasData,
  keyframesData,
  onVideoRecorded
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title for your play");
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to save plays");
        return;
      }

      // Get the recorded video blob
      const videoBlob = await onVideoRecorded();
      let videoUrl = null;

      if (videoBlob) {
        const fileName = `${crypto.randomUUID()}.webm`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('team-assets')
          .upload(fileName, videoBlob);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('team-assets')
          .getPublicUrl(fileName);

        videoUrl = publicUrl;
      }

      const { error } = await supabase
        .from('plays')
        .insert({
          title,
          description,
          canvas_data: canvasData,
          keyframes: keyframesData,
          user_id: user.id,
          video_url: videoUrl
        });

      if (error) throw error;

      toast.success("Play saved successfully!");
      onClose();
    } catch (error) {
      console.error('Error saving play:', error);
      toast.error("Failed to save play. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Play</DialogTitle>
          <DialogDescription>
            Add a title and description to save your water polo play.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter play title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter play description (optional)"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Play"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SavePlayDialog;