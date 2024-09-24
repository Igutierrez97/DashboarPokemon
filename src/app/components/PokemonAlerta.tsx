import { Alert, AlertTitle, AlertDescription } from "@/components/ui";

export const PokemonAlert = ({description}:{description:string}) => {
  return (
    <Alert variant={"destructive"}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  );
};
