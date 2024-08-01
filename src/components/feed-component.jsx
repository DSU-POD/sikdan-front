import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function FeedComponent() {
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  return (
    (<div className="flex flex-col h-screen">
      <header
        className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <InstagramIcon className="w-6 h-6" />
          <span className="font-bold text-lg">Instagram</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <HomeIcon className="w-5 h-5" />
            <span className="sr-only">Home</span>
          </Button>
          <Button variant="ghost" size="icon">
            <SearchIcon className="w-5 h-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <SquarePlusIcon className="w-5 h-5" />
            <span className="sr-only">Create</span>
          </Button>
          <Button variant="ghost" size="icon">
            <HeartIcon className="w-5 h-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Avatar className="w-6 h-6">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <Card className="rounded-lg overflow-hidden">
            <CardHeader className="flex items-center gap-3 p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <Link href="#" className="font-medium" prefetch={false}>
                    shadcn
                  </Link>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">3h ago</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <img
                src="/placeholder.svg"
                width={600}
                height={600}
                alt="Post"
                className="aspect-square object-cover" />
            </CardContent>
            <CardFooter className="p-4 grid gap-3">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <ThumbsUpIcon className="w-5 h-5" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsCommentOpen(true)}>
                  <MessageCircleIcon className="w-5 h-5" />
                  <span className="sr-only">Comment</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <ShareIcon className="w-5 h-5" />
                  <span className="sr-only">Share</span>
                </Button>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <BookmarkIcon className="w-5 h-5" />
                  <span className="sr-only">Save</span>
                </Button>
              </div>
              <div className="space-y-2">
                <div>
                  <Link href="#" className="font-medium" prefetch={false}>
                    shadcn
                  </Link>
                  This is a sample caption for an Instagram post.
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">View all 12 comments</div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      {isCommentOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center p-4">
          <div
            className="bg-white dark:bg-gray-950 rounded-t-2xl w-full max-w-md shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <div className="font-medium">shadcn</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">3h ago</div>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-medium">jaredpalmer</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Great post!</div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <ThumbsUpIcon className="w-4 h-4" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ReplyIcon className="w-4 h-4" />
                      <span className="sr-only">Reply</span>
                    </Button>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">1h</div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>ML</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-medium">maxleiter</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Awesome!</div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <ThumbsUpIcon className="w-4 h-4" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ReplyIcon className="w-4 h-4" />
                      <span className="sr-only">Reply</span>
                    </Button>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">2h</div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-medium">shuding_</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Love the filter!</div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <ThumbsUpIcon className="w-4 h-4" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ReplyIcon className="w-4 h-4" />
                      <span className="sr-only">Reply</span>
                    </Button>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">4h</div>
                  </div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-800 pt-4">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Textarea
                  placeholder="Add a comment..."
                  className="flex-1 resize-none border-0 focus:ring-0 dark:bg-gray-950 dark:text-gray-50" />
                <Button variant="ghost" size="icon">
                  <SendIcon className="w-4 h-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>)
  );
}

function BookmarkIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>)
  );
}


function HeartIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>)
  );
}


function HomeIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>)
  );
}


function InstagramIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>)
  );
}


function MessageCircleIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>)
  );
}


function ReplyIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>)
  );
}


function SearchIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}


function SendIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>)
  );
}


function ShareIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>)
  );
}


function SquarePlusIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>)
  );
}


function ThumbsUpIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M7 10v12" />
      <path
        d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>)
  );
}


function XIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}
