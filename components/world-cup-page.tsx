import { getWorldCupData } from "@/lib/api";
import { WorldCupClientPage } from "@/components/world-cup-client-page";

export async function WorldCupPage() {
  const data = await getWorldCupData();
  return <WorldCupClientPage data={data} />;
}
