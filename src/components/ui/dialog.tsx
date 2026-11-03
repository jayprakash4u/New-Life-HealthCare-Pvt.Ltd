'use client';

import * as Primitive from '@radix-ui/react-dialog';
import { ModalContent, type ModalContentProps } from './modal-content';

export const Dialog = Primitive.Root;
export const DialogTrigger = Primitive.Trigger;
export const DialogClose = Primitive.Close;

export function DialogContent(props: ModalContentProps) {
  return <ModalContent {...props} />;
}
