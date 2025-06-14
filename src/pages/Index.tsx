
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { PlusCircle, Trash2 } from "lucide-react";

interface App {
  id: number;
  name: string;
  packageName: string;
}

const Index = () => {
  const [isApiEnabled, setIsApiEnabled] = useState(false);
  const [apiPort, setApiPort] = useState("8080");
  const [applications, setApplications] = useState<App[]>([
    { id: 1, name: "Ventas Agua", packageName: "com.tuempresa.ventasagua" },
    { id: 2, name: "Mis Cuentas", packageName: "com.tuempresa.miscuentas" },
  ]);
  const [newAppName, setNewAppName] = useState("");
  const [newAppPackageName, setNewAppPackageName] = useState("");
  const [isAddAppDialogOpen, setIsAddAppDialogOpen] = useState(false);

  const handleAddApplication = () => {
    if (!newAppName || !newAppPackageName) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }
    const newApp: App = {
      id: Date.now(),
      name: newAppName,
      packageName: newAppPackageName,
    };
    setApplications([...applications, newApp]);
    toast.success(`Aplicación "${newAppName}" agregada.`);
    setNewAppName("");
    setNewAppPackageName("");
    setIsAddAppDialogOpen(false);
  };

  const handleDeleteApplication = (appId: number) => {
    const appToDelete = applications.find(app => app.id === appId);
    setApplications(applications.filter((app) => app.id !== appId));
    if (appToDelete) {
        toast.info(`Aplicación "${appToDelete.name}" eliminada.`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Agente de Automatización Financiera
          </h1>
          <p className="text-muted-foreground">
            Configure las reglas de interacción entre sus aplicaciones financieras.
          </p>
        </header>

        <main className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de API Local</CardTitle>
              <CardDescription>
                Habilite la API para permitir la comunicación entre aplicaciones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="api-switch" className="flex flex-col space-y-1">
                  <span>Habilitar API</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    {isApiEnabled ? "La API está activa." : "La API está inactiva."}
                  </span>
                </Label>
                <Switch
                  id="api-switch"
                  checked={isApiEnabled}
                  onCheckedChange={setIsApiEnabled}
                />
              </div>
              {isApiEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="api-port">Puerto de la API</Label>
                  <Input
                    id="api-port"
                    value={apiPort}
                    onChange={(e) => setApiPort(e.target.value)}
                    placeholder="e.g., 8080"
                    className="max-w-xs"
                  />
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                  <CardTitle>Aplicaciones Conectadas</CardTitle>
                  <CardDescription>
                  Administre las aplicaciones que el agente puede automatizar.
                  </CardDescription>
              </div>
              <Dialog open={isAddAppDialogOpen} onOpenChange={setIsAddAppDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Aplicación
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Agregar Nueva Aplicación</DialogTitle>
                    <DialogDescription>
                      Ingrese el nombre y el paquete para conectar una nueva aplicación.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nombre
                      </Label>
                      <Input
                        id="name"
                        value={newAppName}
                        onChange={(e) => setNewAppName(e.target.value)}
                        className="col-span-3"
                        placeholder="Ej: Mis Cuentas"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="package-name" className="text-right">
                        Paquete
                      </Label>
                      <Input
                        id="package-name"
                        value={newAppPackageName}
                        onChange={(e) => setNewAppPackageName(e.target.value)}
                        className="col-span-3"
                        placeholder="com.empresa.app"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddApplication}>Guardar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div>
                        <p className="font-semibold">{app.name}</p>
                        <p className="text-sm text-muted-foreground">{app.packageName}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteApplication(app.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
                  <p className="font-medium">No hay aplicaciones conectadas.</p>
                  <p className="text-sm mt-1">Haga clic en "Agregar Aplicación" para comenzar.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Index;
