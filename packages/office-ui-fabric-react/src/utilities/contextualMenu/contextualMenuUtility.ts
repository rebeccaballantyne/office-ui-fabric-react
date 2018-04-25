import { IContextualMenuItem } from '../..';

/**
 * Determines the effective checked state of a menu item.
 *
 * @param item {IContextualMenuItem} to get the check state of.
 * @returns {true} if the item is checked.
 * @returns {false} if the item is unchecked.
 * @returns {null} if the item is not checkable.
 */
export function getIsChecked(item: IContextualMenuItem): boolean | null {
  if (item.canCheck) {
    return !!(item.isChecked || item.checked);
  }

  // Item is not checkable.
  return null;
}

export function hasSubmenu(item: IContextualMenuItem): boolean {
  return !!(item.subMenuProps || item.items);
}
