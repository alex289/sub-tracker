'use client';

import { Heart, Info, Shield } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as packageJson from '../../package.json';

export default function AboutDialog() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="About">
          <Info className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-[600px]">
        <Card className="border-0 p-0 shadow-none">
          <CardHeader className="bg-muted/50 rounded-t-lg border-b pt-4 text-center">
            <CardTitle className="text-2xl font-bold">Sub Tracker</CardTitle>
            <CardDescription>Version {packageJson.version}</CardDescription>
          </CardHeader>

          <Tabs
            defaultValue="about"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full px-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="license">License</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Info className="text-primary h-5 w-5" />
                  <h3 className="text-lg font-medium">About AppName</h3>
                </div>
                <p className="text-muted-foreground">
                  Sub Tracker is a local first subscription tracker designed to
                  help users keep track of their subscriptions and bills.
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <Shield className="text-primary h-5 w-5" />
                  <h3 className="text-lg font-medium">Technology</h3>
                </div>
                <p className="text-muted-foreground">
                  Built with Tauri, React, and TypeScript to provide a fast,
                  responsive, and reliable desktop experience across all major
                  operating systems. For the design and UI, we used Tailwind in
                  combination with Shadcn UI.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold">
                          {packageJson.version}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Current Version
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold">
                          {new Date().getFullYear()}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Released
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team" className="p-4">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Heart className="text-primary h-5 w-5" />
                  <h3 className="text-lg font-medium">Our Team</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="bg-muted mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full">
                          <span className="text-2xl font-bold">AK</span>
                        </div>
                        <h4 className="font-medium">Alexander Konietzko</h4>
                        <p className="text-muted-foreground text-sm">
                          Maintainer
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="license" className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="text-primary h-5 w-5" />
                  <h3 className="text-lg font-medium">License Information</h3>
                </div>

                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <p className="text-sm">
                      Copyright (c) {new Date().getFullYear()} Alexander
                      Konietzko
                    </p>
                    <p className="mt-2 text-sm">
                      Licensed under the MIT License.
                    </p>
                    <p className="mt-4 text-sm">
                      Permission is hereby granted, free of charge, to any
                      person obtaining a copy of this software and associated
                      documentation files (the &quot;Software&quot;), to deal in
                      the Software without restriction, including without
                      limitation the rights to use, copy, modify, merge,
                      publish, distribute, sublicense, and/or sell copies of the
                      Software, and to permit persons to whom the Software is
                      furnished to do so, subject to the following conditions:
                      The above copyright notice and this permission notice
                      shall be included in all copies or substantial portions of
                      the Software.
                      <br />
                      <br />
                      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT
                      WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
                      NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
                      FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
                      SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
                      CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
                      CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
                      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
                      IN THE SOFTWARE.
                    </p>
                  </CardContent>
                </Card>

                <div className="mt-4">
                  <p className="text-muted-foreground text-sm">
                    This software includes third-party open source software
                    components.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <CardFooter className="bg-muted/50 flex justify-between border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://github.com/alex289/sub-tracker"
                  target="_blank"
                  rel="noopener noreferrer">
                  <div className="h-4 w-4">
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <title>GitHub</title>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </div>
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </div>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
