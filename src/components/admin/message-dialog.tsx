"use client";

import { useState } from "react";
import { sendAdminMessage } from "~/app/admin/actions";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export function MessageDialog({
  recipientId,
  recipientEmail,
}: {
  recipientId: string;
  recipientEmail: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm">
          Message
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Message {recipientEmail}</DialogTitle>
        <form
          action={sendAdminMessage.bind(null, recipientId)}
          className="mt-4 flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="body">Message</Label>
            <Textarea
              id="body"
              name="body"
              required
              placeholder="Hey! Want to sign up to volunteer at your next tournament?"
            />
          </div>
          <Button type="submit" size="sm" className="self-end">
            Send
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
