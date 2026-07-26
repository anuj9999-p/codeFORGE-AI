import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SortVisualizer } from "@/components/features/visualizer/sort-visualizer";
import { Card, CardContent } from "@/components/ui/card";

const COMING_SOON = [
  { key: "searching", label: "Searching", desc: "Binary Search, Linear Search" },
  { key: "trees", label: "Trees", desc: "BST, AVL, Heap traversal & rotation" },
  { key: "graphs", label: "Graphs", desc: "DFS, BFS, Dijkstra, Prim, Kruskal, Floyd–Warshall" },
  { key: "dp", label: "Dynamic Programming", desc: "Knapsack, LCS, Matrix Chain" },
  { key: "backtracking", label: "Backtracking", desc: "Sudoku, N-Queens" },
  { key: "greedy", label: "Greedy", desc: "Huffman Coding, Fractional Knapsack" },
];

export default function VisualizerPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
          Algorithm Visualizer
        </h1>
        <p className="mt-3 text-[15px] text-bone-muted">
          Watch the algorithm think. Step through every comparison and swap frame by frame.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <Tabs defaultValue="sorting">
          <TabsList className="mx-auto flex w-fit flex-wrap justify-center">
            <TabsTrigger value="sorting">Sorting</TabsTrigger>
            {COMING_SOON.map((c) => (
              <TabsTrigger key={c.key} value={c.key}>{c.label}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="sorting" className="mt-8">
            <SortVisualizer />
          </TabsContent>

          {COMING_SOON.map((c) => (
            <TabsContent key={c.key} value={c.key} className="mt-8">
              <Card>
                <CardContent className="flex flex-col items-center gap-2 p-12 text-center">
                  <span className="h-2 w-2 animate-flicker rounded-full bg-molten-500" />
                  <p className="font-display text-[15px] font-semibold text-bone">{c.label} — being forged</p>
                  <p className="max-w-sm text-[13px] text-bone-muted">{c.desc}. Interactive step-through for this category is coming next.</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
