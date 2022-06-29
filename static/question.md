my UserContext.js file:

```
import { createContext } from "react";
export const UserContext = createContext(null);
```

My `<Layout>` component which wraps all pages. Only showing the snippet which has the provider wrapper with a string value.

```
<div>
    <UserContext.Provider value="test">
        <Navbar pageId={pageId} />
        <div>{children}</div>
        <Footer />
    </UserContext.Provider>
</div>
```

My Login page. Note that the `<LoginForm/>` component is contained within the `<Layout>` component.

```
function Login() {
    const msg = useContext(UserContext);
    return (
        <div>
            <Layout pageId="login">
                <Seo title="Login" />
                    <aside>
                        {msg && msg}
                    </aside>
                    <main>
                        <LoginForm />
                    </main>
            </Layout>
        </div>
    );
}

```

I'm trying to output "test" in both this `Login` component as well as the child `LoginForm` component but I'm only seeing the output within the `LoginForm`.

Why will it render in the nested child component LoginForm but not as a child of Layout?
