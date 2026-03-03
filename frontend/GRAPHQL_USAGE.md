# Guia de Uso - GraphQL no Frontend

## Configuração

1. **Instalar dependências** (já feito):

   ```bash
   npm install @tanstack/react-query graphql-request graphql
   ```

2. **Criar arquivo `.env`** (baseado no `.env.example`):
   ```
   VITE_API_URL=http://localhost:3333
   ```

## Estrutura

```
src/
├── lib/
│   ├── graphql-client.ts    # Cliente GraphQL configurado
│   └── types.ts             # TypeScript types
├── hooks/
│   ├── use-auth.ts          # Hooks de autenticação
│   └── use-categories.ts    # Hooks de categorias
└── main.tsx                 # QueryClientProvider configurado
```

## Exemplos de Uso

### Autenticação

#### Login

```tsx
import { useLogin } from "@/hooks/use-auth";

function LoginPage() {
  const login = useLogin();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login.mutateAsync({
        email: "user@example.com",
        password: "123456",
      });
      // Token salvo automaticamente no localStorage
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Seus inputs aqui */}
      <button type="submit" disabled={login.isPending}>
        {login.isPending ? "Entrando..." : "Entrar"}
      </button>
      {login.isError && <p>Erro: {login.error.message}</p>}
    </form>
  );
}
```

#### Signup

```tsx
import { useSignup } from "@/hooks/use-auth";

function RegisterPage() {
  const signup = useSignup();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signup.mutateAsync({
        email: "newuser@example.com",
        password: "123456",
        name: "João Silva",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return <form onSubmit={handleSignup}>{/* ... */}</form>;
}
```

#### Verificar Usuário Logado

```tsx
import { useMe } from "@/hooks/use-auth";

function ProfilePage() {
  const { data: user, isLoading, isError } = useMe();

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Não autenticado</p>;

  return (
    <div>
      <h1>Perfil</h1>
      <p>Nome: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}
```

#### Logout

```tsx
import { useLogout } from "@/hooks/use-auth";

function Header() {
  const logout = useLogout();

  return <button onClick={logout}>Sair</button>;
}
```

### Categorias

#### Listar Categorias

```tsx
import { useCategories } from "@/hooks/use-categories";

function CategoriesPage() {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) return <p>Carregando categorias...</p>;
  if (isError) return <p>Erro ao carregar categorias</p>;

  return (
    <div>
      <h1>Minhas Categorias</h1>
      {categories?.map((category) => (
        <div key={category.id} style={{ color: category.color }}>
          <span>{category.icon}</span>
          <h3>{category.title}</h3>
          <p>{category.description}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Criar Categoria

```tsx
import { useCreateCategory } from "@/hooks/use-categories";

function CreateCategoryForm() {
  const createCategory = useCreateCategory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createCategory.mutateAsync({
        title: "Trabalho",
        description: "Tarefas relacionadas ao trabalho",
        color: "#FF5733",
        icon: "💼",
      });
      // Lista de categorias é atualizada automaticamente
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Seus inputs aqui */}
      <button type="submit" disabled={createCategory.isPending}>
        {createCategory.isPending ? "Criando..." : "Criar Categoria"}
      </button>
    </form>
  );
}
```

#### Editar Categoria

```tsx
import { useUpdateCategory } from "@/hooks/use-categories";

function EditCategoryForm({ categoryId }: { categoryId: string }) {
  const updateCategory = useUpdateCategory();

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await updateCategory.mutateAsync({
        id: categoryId,
        title: "Trabalho Urgente",
        color: "#FF0000",
        // Campos não enviados permanecem inalterados
      });
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  return <form onSubmit={handleUpdate}>{/* ... */}</form>;
}
```

#### Deletar Categoria

```tsx
import { useDeleteCategory } from "@/hooks/use-categories";

function CategoryCard({ categoryId }: { categoryId: string }) {
  const deleteCategory = useDeleteCategory();

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja deletar?")) {
      try {
        await deleteCategory.mutateAsync(categoryId);
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  };

  return (
    <div>
      {/* Conteúdo do card */}
      <button onClick={handleDelete} disabled={deleteCategory.isPending}>
        {deleteCategory.isPending ? "Deletando..." : "Deletar"}
      </button>
    </div>
  );
}
```

## Estados de Loading e Erro

Todos os hooks retornam estados úteis:

```tsx
const {
  data, // Dados retornados
  isLoading, // Carregando primeira vez
  isFetching, // Carregando (incluindo refetch)
  isError, // Houve erro
  error, // Objeto de erro
  isPending, // Para mutations
  isSuccess, // Sucesso
} = useCategories();
```

## Autenticação Automática

O token JWT é:

- Salvo automaticamente no `localStorage` após login/signup
- Incluído automaticamente em todas as requisições
- Removido no logout

## Cache Automático

O TanStack Query gerencia cache automaticamente:

- Queries são cacheadas por 5 minutos (padrão)
- Mutations invalidam queries relacionadas
- Refetch automático em casos específicos

## Customização

Para ajustar configurações do QueryClient, edite `main.tsx`:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Número de tentativas
      refetchOnWindowFocus: false, // Refetch ao focar janela
      staleTime: 5 * 60 * 1000, // Tempo até dados ficarem "stale"
    },
  },
});
```
