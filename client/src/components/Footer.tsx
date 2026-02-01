import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container flex h-14 items-center justify-between">
        <p className="mx-6 text-sm text-muted-foreground flex items-center gap-1">
          Built with <Heart className="h-3 w-3 text-red-500" /> by <a href="https://pythagora.ai" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Pythagora</a>
        </p>
      </div>
    </footer>
  )
}