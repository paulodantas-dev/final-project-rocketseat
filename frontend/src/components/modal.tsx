import type * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ModalRootProps = React.ComponentProps<typeof Dialog>;

function ModalRoot(props: ModalRootProps) {
  return <Dialog {...props} />;
}

type ModalTriggerProps = React.ComponentProps<typeof DialogTrigger>;

function ModalTrigger(props: ModalTriggerProps) {
  return <DialogTrigger {...props} />;
}

type ModalContentProps = React.ComponentProps<typeof DialogContent>;

function ModalContent({ className, ...props }: ModalContentProps) {
  return <DialogContent className={className} {...props} />;
}

type ModalHeaderProps = React.ComponentProps<typeof DialogHeader>;

function ModalHeader(props: ModalHeaderProps) {
  return <DialogHeader {...props} />;
}

type ModalTitleProps = React.ComponentProps<typeof DialogTitle>;

function ModalTitle(props: ModalTitleProps) {
  return <DialogTitle {...props} />;
}

type ModalDescriptionProps = React.ComponentProps<typeof DialogDescription>;

function ModalDescription(props: ModalDescriptionProps) {
  return <DialogDescription {...props} />;
}

type ModalBodyProps = React.ComponentProps<"div">;

function ModalBody(props: ModalBodyProps) {
  return <div {...props} />;
}

export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
};
