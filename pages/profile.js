import { Auth, Button, Typography } from "@supabase/ui";
import { supabase } from "../api";
import { Header } from "./index";

const Text = Typography.Text;

function Profile(props) {
  const { user } = Auth.useUser();

  if (user) {
    return (
      <>
        <Header title={`Profile | ${user.email}`} />
        <div className="max-w-lg mix-blend-saturation mx-auto">
          <Text className="text-xl">Signed in: {user.email}</Text>
          <Button
            block
            size="medium"
            onClick={() => props.supabaseClient.auth.signOut()}
          >
            Sign out
          </Button>
        </div>
      </>
    );
  }
  return props.children;
}

export default function AuthProfile() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Profile supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Profile>
    </Auth.UserContextProvider>
  );
}
