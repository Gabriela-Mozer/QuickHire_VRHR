import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export function BlankPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary">
      <div className="text-center space-y-6">
        <AlertCircle className="h-16 w-16 mx-auto text-muted-foreground" />
        <div>
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Page not found
          </p>
        </div>
        <Button 
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Go back home
        </Button>
      </div>
    </div>
  )
}