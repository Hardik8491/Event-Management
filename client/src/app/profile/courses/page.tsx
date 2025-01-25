import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import React from 'react'

const Courses = () => {
  return (
    <div>
         <div className="grid gap-4">
            <div className="grid gap-1">
              <h2 className="text-2xl font-bold">Courses</h2>
              <p className="text-muted-foreground">
                View and manage your enrolled courses.
              </p>
            </div>
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Introduction to React</div>
                        <div className="text-sm text-muted-foreground">
                          Beginner Level
                        </div>
                      </TableCell>
                      <TableCell>
                        <Progress value={75} aria-label="75% complete" />
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">In Progress</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Advanced JavaScript</div>
                        <div className="text-sm text-muted-foreground">
                          Intermediate Level
                        </div>
                      </TableCell>
                      <TableCell>
                        <Progress value={90} aria-label="90% complete" />
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Completed</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Mastering CSS</div>
                        <div className="text-sm text-muted-foreground">
                          Intermediate Level
                        </div>
                      </TableCell>
                      <TableCell>
                        <Progress value={50} aria-label="50% complete" />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Paused</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
      
    </div>
  )
}

export default Courses
