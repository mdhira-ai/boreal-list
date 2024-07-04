import { useRef } from 'react';
import { FixedSizeList } from 'react-window';

function Boreallist({ data, load }) {
    const isUpDirection = useRef(false); // to know the direction of your scroll action

    const handleScroll = ({ scrollDirection }) => {
        if (scrollDirection === "forward") {
            isUpDirection.current = true;
        } else {
            isUpDirection.current = false;
        }
    };

    const handleItemsRendered = ({ overscanStopIndex, visibleStopIndex }) => {
        const threshold = 2; // Load more data when 2 items remain to be displayed
        if (visibleStopIndex >= data?.length - threshold) {
            console.log('load more');
            load();
        }
    };

    return (
        <FixedSizeList
            height={400}
            itemCount={data?.length}
            overscanCount={5}
            itemData={data}
            itemSize={50}
            onScroll={handleScroll}
            onItemsRendered={handleItemsRendered}
        >
            {({ index, style }) => (
                <div
                    style={style}
                    className="flex flex-row gap-2 bg-slate-800 p-2 justify-start"
                >
                    <span>{data?.[index].id}</span>
                    <span>{data?.[index].title}</span>
                </div>
            )}
        </FixedSizeList>
    );
}

export default Boreallist;
