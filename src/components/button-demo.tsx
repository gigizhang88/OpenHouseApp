import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex gap-4">
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">🔔</Button>
      </div>
    </div>
  )
} 