"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Fires the `case_view` analytics event when a case page is opened.
export default function CaseTrack({ caseId }: { caseId: string }) {
  useEffect(() => {
    track("case_view", { case: caseId });
  }, [caseId]);
  return null;
}
