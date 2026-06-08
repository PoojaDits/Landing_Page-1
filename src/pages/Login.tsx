import { useState } from 'react'
import { useLogin } from '@/hooks/useAuthMutations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// ... other imports

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { mutate, isPending, error } = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Signing in...' : 'Sign In'}
      </Button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  )
}