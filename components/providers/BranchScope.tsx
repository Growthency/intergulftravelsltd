'use client';

import { createContext, useContext, type ReactNode } from 'react';

/**
 * The branch the signed-in user is locked to (branch admins), or `null` for the
 * super admin who can see every branch. Fed once from the admin layout so any
 * client form can hide its branch selector and post the correct branch.
 */
const BranchScopeContext = createContext<string | null>(null);

export function BranchScopeProvider({
  branch,
  children,
}: {
  branch: string | null;
  children: ReactNode;
}) {
  return <BranchScopeContext.Provider value={branch}>{children}</BranchScopeContext.Provider>;
}

/** Returns the locked branch value, or `null` when the user sees all branches. */
export function useLockedBranch(): string | null {
  return useContext(BranchScopeContext);
}
