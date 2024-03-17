import { component$ } from '@builder.io/qwik';
import { Button } from '~/ui/button';
import { HiEllipsisHorizontalOutline } from '@qwikest/icons/heroicons';
import { UiIcon } from '~/ui/UiIcon';
import { useLocation, useNavigate } from '@builder.io/qwik-city';

export interface PaginationProps {
  page: number;
  totalPages: number;
}

export const Pagination = component$<PaginationProps>(
  ({ page, totalPages }) => {
    const arrayRange = (start: number, stop: number) =>
      Array.from({ length: stop - start + 1 }, (_, index) => start + index);

    return (
      <div class="join py-8">
        {totalPages <= 7 &&
          arrayRange(1, totalPages).map((p) => (
            <PaginationButton key={p} page={p} isCurrent={p === page} />
          ))}

        {totalPages > 7 && page <= 4 && (
          // Show 1, 2, 3, 4, 5, ..., lastpage
          <>
            {arrayRange(1, 5).map((p) => (
              <PaginationButton key={p} page={p} isCurrent={p === page} />
            ))}
            <Button color="neutral" disabled class="join-item">
              <UiIcon>
                <HiEllipsisHorizontalOutline />
              </UiIcon>
            </Button>

            <PaginationButton
              page={totalPages}
              isCurrent={totalPages === page}
            />
          </>
        )}

        {totalPages > 7 && page >= totalPages - 3 && (
          // Show 1, ..., lastpage - 4, lastpage - 3, lastpage - 2, lastpage - 1, lastpage
          <>
            <PaginationButton page={1} isCurrent={1 === page} />
            <Button color="neutral" disabled class="join-item">
              <UiIcon>
                <HiEllipsisHorizontalOutline />
              </UiIcon>
            </Button>

            {arrayRange(totalPages - 4, totalPages).map((p) => (
              <PaginationButton key={p} page={p} isCurrent={p === page} />
            ))}
          </>
        )}

        {totalPages > 7 && page > 4 && page < totalPages - 3 && (
          // Show 1, ..., page - 1, page, page + 1, ..., lastpage
          <>
            <Button
              color="neutral"
              class={['join-item', 1 === page && 'btn-active']}
            >
              {1}
            </Button>
            <PaginationButton page={1} isCurrent={1 === page} />
            <Button color="neutral" disabled class="join-item">
              <UiIcon>
                <HiEllipsisHorizontalOutline />
              </UiIcon>
            </Button>

            {arrayRange(page - 1, page + 1).map((p) => (
              <PaginationButton key={p} page={p} isCurrent={p === page} />
            ))}
            <Button color="neutral" disabled class="join-item">
              <UiIcon>
                <HiEllipsisHorizontalOutline />
              </UiIcon>
            </Button>
            <PaginationButton
              page={totalPages}
              isCurrent={totalPages === page}
            />
          </>
        )}
      </div>
    );
  },
);

export interface PaginationButtonProps {
  isCurrent: boolean;
  page: number;
}

export const PaginationButton = component$<PaginationButtonProps>(
  ({ page, isCurrent }) => {
    const location = useLocation();
    const nav = useNavigate();

    return (
      <Button
        color="neutral"
        class={['join-item', isCurrent && 'btn-active']}
        onClick$={() => {
          const url = new URL(location.url);
          url.searchParams.set('page', page.toString());
          nav(url.toString());
        }}
      >
        {page}
      </Button>
    );
  },
);
