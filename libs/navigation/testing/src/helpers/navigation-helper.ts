import { DaffNavigationTree } from "@daffodil/navigation";

/**
 * A helper function to verify that a model is a Navigation.
 * @param navigation
 */
export function isNavigation(navigation: DaffNavigationTree): boolean {
  return navigation.id != null && navigation.name != null;
}
