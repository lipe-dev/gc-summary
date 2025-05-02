import { FragmentCalculator } from "@/app/frags/FragmentCalculator";

export default function FragsPage() {
  return (
    <div className="pt-16">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-blue-400 mb-6">Fragment Calculator</h1>
        <FragmentCalculator />
      </div>
    </div>
  );
}
