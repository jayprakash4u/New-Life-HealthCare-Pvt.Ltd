'use client';

import * as Primitive from '@radix-ui/react-dialog';
import { ModalContent, type ModalContentProps } from './modal-content';

export const Drawer = Primitive.Root;
export const DrawerTrigger = Primitive.Trigger;
export const DrawerClose = Primitive.Close;

export function DrawerContent(
  props: ModalContentProps & { side?: 'left' | 'right' },
) {
  return <ModalContent {...props} presentation="drawer" />;
}
