import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StructureExplorer } from "@/components/features/data-structures/structure-explorer";
import { Card, CardContent } from "@/components/ui/card";

const COMING_SOON = [
  "Linked List", "Deque", "Hash Map", "Hash Set", "Heap",
  "Trie", "Segment Tree", "Fenwick Tree", "Binary Tree", "AVL Tree", "Graph",
];

export default function DataStructuresPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
          Data Structures Explorer
        </h1>
        <p className="mt-3 text-[15px] text-bone-muted">
          Push, pop, enqueue, dequeue — watch the structure change in real time.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <Tabs defaultValue="array">
          <TabsList className="mx-auto flex w-fit flex-wrap justify-center">
            <TabsTrigger value="array">Array</TabsTrigger>
            <TabsTrigger value="stack">Stack</TabsTrigger>
            <TabsTrigger value="queue">Queue</TabsTrigger>
            {COMING_SOON.map((c) => (
              <TabsTrigger key={c} value={c}>{c}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="array" className="mt-8">
            <StructureExplorer mode="array" />
          </TabsContent>
          <TabsContent value="stack" className="mt-8">
            <StructureExplorer mode="stack" />
          </TabsContent>
          <TabsContent value="queue" className="mt-8">
            <StructureExplorer mode="queue" />
          </TabsContent>

          {COMING_SOON.map((c) => (
            <TabsContent key={c} value={c} className="mt-8">
              <Card>
                <CardContent className="flex flex-col items-center gap-2 p-12 text-center">
                  <span className="h-2 w-2 animate-flicker rounded-full bg-molten-500" />
                  <p className="font-display text-[15px] font-semibold text-bone">{c} — being forged</p>
                  <p className="max-w-sm text-[13px] text-bone-muted">Interactive operations for this structure are coming next.</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
