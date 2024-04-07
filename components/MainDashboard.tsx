import React, { useState, useEffect } from 'react';
import { fetchShows, Show } from '@/services/tvMazeApi';
import { ShowDetailsDrawer } from "@/components/ShowDetails"
import Image from "next/image"
import Link from "next/link"
import {
  Home,
  Package2,
  PanelLeft,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
  
// Constants (Shows per page and max pages)
const SHOWS_PER_PAGE = 15;
const MAX_PAGES_DISPLAYED = 5;

export function Dashboard() {
    const [allShows, setAllShows] = useState<Show[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentShows, setCurrentShows] = useState<Show[]>([]);
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
        fetchShows().then(data => {
          setAllShows(data as Show[]);
          setCurrentShows(data.slice(0, SHOWS_PER_PAGE) as Show[]);
        });
    }, []);
    
    useEffect(() => {
        const filteredShows = allShows.filter(show => {
        const matchesSearch = show.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = genre === "any" || !genre || show.genres.includes(genre);
        const matchesRating = rating === "any" || !rating || show.rating.average >= (parseInt(rating, 10) / 10);
    
        return matchesSearch && matchesGenre && matchesRating;
        });
        
        // Paginate filtered shows
        const startIndex = (currentPage - 1) * SHOWS_PER_PAGE;
        const paginatedShows = filteredShows.slice(startIndex, startIndex + SHOWS_PER_PAGE);
        
        setCurrentShows(paginatedShows);
    }, [searchQuery, genre, rating, allShows, currentPage]);
    
    const totalPages = Math.ceil(allShows.length / SHOWS_PER_PAGE);

    const getPaginationNumbers = () => {
        let start = Math.max(currentPage - Math.floor(MAX_PAGES_DISPLAYED / 2), 1);
        let end = Math.min(start + MAX_PAGES_DISPLAYED - 1, totalPages);

        if (totalPages >= MAX_PAGES_DISPLAYED && end - start + 1 < MAX_PAGES_DISPLAYED) {
            start = end - MAX_PAGES_DISPLAYED + 1;
        }

        const range = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };
  
    const renderPagination = () => {
        const pageNumbers = getPaginationNumbers();
        return (
            <Pagination>
                <PaginationContent>
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                        </PaginationItem>
                    )}

                    {pageNumbers[0] > 1 && (
                        <>
                            <PaginationItem>
                                <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                            </PaginationItem>
                            {pageNumbers[0] > 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                        </>
                    )}

                    {pageNumbers.map(page => (
                        <PaginationItem key={page}>
                            <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {pageNumbers[pageNumbers.length - 1] < totalPages && (
                        <>
                            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                                <PaginationItem><PaginationEllipsis /></PaginationItem>
                            )}
                            <PaginationItem>
                                <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                            </PaginationItem>
                        </>
                    )}

                    {currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        );
    };
  
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Home className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Home</span>
                </Link>
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                        href="#"
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                        <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                        <span className="sr-only">TV Shows</span>
                        </Link>
                    </nav>
                    </SheetContent>
                </Sheet>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center">
                    <div className="ml-auto flex items-center gap-2">
                        <div className="relative ml-auto flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                            />
                        </div>
                        <Select value={genre} onValueChange={setGenre}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Genre" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any Genre</SelectItem>
                                <SelectItem value="Drama">Drama</SelectItem>
                                <SelectItem value="Comedy">Comedy</SelectItem>
                                <SelectItem value="Action">Action</SelectItem>
                                <SelectItem value="Sports">Sports</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={rating} onValueChange={setRating}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Rating" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any Rating</SelectItem>
                                <SelectItem value="20">2+</SelectItem>
                                <SelectItem value="30">3+</SelectItem>
                                <SelectItem value="40">4+</SelectItem>
                                <SelectItem value="50">5+</SelectItem>
                                <SelectItem value="60">6+</SelectItem>
                                <SelectItem value="70">7+</SelectItem>
                                <SelectItem value="80">8+</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                    </div>
                    <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                        <CardTitle>TV Shows</CardTitle>
                        <CardDescription>
                            TVMaze API search and filter shows by genre and rating, by Kevin Hang.
                        </CardDescription>
                        </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Rating</TableHead>
                                            <TableHead>Genre</TableHead>
                                            <TableHead>Premiered</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                        <TableBody>
                                            {currentShows.length > 0 ? (
                                                currentShows.map((show) => (
                                                    <TableRow key={show.id}>
                                                        <TableCell>
                                                            {show.image ? (
                                                            <Image 
                                                                src={show.image.medium} 
                                                                alt={`Cover image for ${show.name}`} 
                                                                width={50} 
                                                                height={50} 
                                                                layout="fixed" />
                                                            ) : "No Image Available"}
                                                        </TableCell>
                                                        <TableCell>{show.name}</TableCell>
                                                        <TableCell>{show.rating.average}</TableCell>
                                                        <TableCell>{show.genres.join(', ')}</TableCell>
                                                        <TableCell>{show.premiered}</TableCell>
                                                        <TableCell><ShowDetailsDrawer showId={show.id} /></TableCell>
                                                    </TableRow>
                                                ))
                                                ) : (
                                                <TableRow>
                                                    <TableCell colSpan={4}>No shows found.</TableCell>
                                                </TableRow>
                                            )}

                                        </TableBody>
                                </Table>
                            </CardContent>
                    </Card>
                    </TabsContent>
                </Tabs>
                </main>
            </div>
            <div style={{ padding: '20px' }}>
                {renderPagination()}
            </div>
        </div>
    )
}
