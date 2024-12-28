import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import MetaDataForm from './MetaDataForm'

const PlatformTabs = () => (
  <Tabs defaultValue="meta" className="w-full min-w-[400px]">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="meta">Meta</TabsTrigger>
      <TabsTrigger value="tiktok">TikTok</TabsTrigger>
    </TabsList>
    <TabsContent value="meta">
      <Card>
        <CardHeader>
          <CardTitle>
            Meta Analytics Dashboard
          </CardTitle>
          <CardDescription>
            Visualize your chart insights with your Meta Marketing API parameter selection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <MetaDataForm />
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="tiktok">
      <Card>
        <CardHeader>
          <CardTitle>TikTok</CardTitle>
          <CardDescription>
            Analytics for TikTok.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          TikTok Analytics
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
)

export default PlatformTabs
