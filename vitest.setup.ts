import { vi } from "vitest";

// Mock all of next-auth
vi.mock("next-auth", () => ({
  getServerSession: vi.fn(() => null),
  default: vi.fn(),
}));

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
  signOut: vi.fn(),
  useSession: vi.fn(() => ({ data: null, status: "unauthenticated" })),
}));

// Mock the providers import (required to stop the "./providers" specifier error)
vi.mock("next-auth/providers", () => ({}));
