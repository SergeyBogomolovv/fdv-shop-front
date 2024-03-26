import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface Props {
  pagesCount: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function RePagination({ pagesCount, page, setPage }: Props) {
  const pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  return (
    <Pagination className='dark'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className='hover:cursor-pointer'
            onClick={() => {
              setPage((prev: number) => {
                if (prev - 1 < 1) return prev
                return prev - 1
              })
            }}
          />
        </PaginationItem>
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              className='hover:cursor-pointer'
              isActive={p == page}
              onClick={() => setPage(p)}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className='hover:cursor-pointer'
            onClick={() =>
              setPage((prev) => {
                if (prev + 1 > pagesCount) return prev
                return prev + 1
              })
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
