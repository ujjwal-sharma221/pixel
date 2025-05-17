import { ArrowRight, LoaderCircle } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface TagsFilterProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

export function TagsFilterProps({ value, onChange }: TagsFilterProps) {
  const trpc = useTRPC();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {
          limit: 10,
        },
        {
          getNextPageParam: (lastPage) => {
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
          },
        }
      )
    );

  const onClick = (tag: string) => {
    if (value?.includes(tag)) {
      onChange(value?.filter((t) => t !== tag) || []);
    } else {
      onChange([...(value || []), tag]);
    }
  };

  return (
    <div className="flex flex-col gap-y-2 mt-2">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <LoaderCircle className="animate-spin size-4" />
        </div>
      ) : (
        data?.pages.map((page) =>
          page.docs.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => onClick(tag.name)}
            >
              <p className="font-medium">{tag.name}</p>
              <Checkbox
                checked={value?.includes(tag.name)}
                onCheckedChange={() => onClick(tag.name)}
              />
            </div>
          ))
        )
      )}
      {hasNextPage ? (
        <Button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="group"
          variant="ghost"
        >
          Load more
          <ArrowRight
            className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
        </Button>
      ) : null}
    </div>
  );
}
