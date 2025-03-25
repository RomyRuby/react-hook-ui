import { useEffect, useRef, useState } from 'react';
import { TransformOffset } from './Transform';
import { Color } from './color';

type EventType =
    | MouseEvent
    | React.MouseEvent<Element, MouseEvent>

type EventHandle = (e: EventType) => void;

interface useColorDragProps {
    offset?: TransformOffset;
    color: Color;
    containerRef: React.RefObject<HTMLDivElement>;//容器元素
    targetRef: React.RefObject<HTMLDivElement>;//拖拽元素
    direction?: 'x' | 'y';
    onDragChange?: (offset: TransformOffset) => void;
    calculate?: () => TransformOffset;
}

function useColorDrag(
    props: useColorDragProps,
): [TransformOffset, EventHandle] {
    const {
        offset,
        color,
        targetRef,
        containerRef,
        direction,
        onDragChange,
        calculate,
    } = props;

    const [offsetValue, setOffsetValue] = useState(offset || { x: 0, y: 0 });
    const dragRef = useRef({
        flag: false
    });

    useEffect(() => {
        if (dragRef.current.flag === false) {
            const calcOffset = calculate?.();
            if (calcOffset) {
                setOffsetValue(calcOffset);
            }
        }
    }, [color]);

    useEffect(() => {
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragStop);
    }, []);

    const updateOffset: EventHandle = e => {
        const scrollXOffset = document.documentElement.scrollLeft || document.body.scrollLeft;
        const scrollYOffset = document.documentElement.scrollTop || document.body.scrollTop;
        const pageX = e.pageX - scrollXOffset; //鼠标距可视区域左边的距离
        const pageY = e.pageY - scrollYOffset; //鼠标距可视区域顶部的距离
        const {
            x: rectX,
            y: rectY,
            width,
            height
        } = containerRef.current!.getBoundingClientRect(); //容器的位置信息

        const {
            width: targetWidth,
            height: targetHeight
        } = targetRef.current!.getBoundingClientRect();//拖拽元素的宽高

        const centerOffsetX = targetWidth / 2; //拖拽元素半径
        const centerOffsetY = targetHeight / 2; //拖拽元素半径

        // 计算拖拽元素中心位置不能超出容器相对可视区域的x,y
        const offsetX = Math.max(0, Math.min(pageX - rectX, width)) - centerOffsetX;
        const offsetY = Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY;

        // 当指定方向拖拽时y不变
        const calcOffset = {
            x: offsetX,
            y: direction === 'x' ? offsetValue.y : offsetY,
        };

        setOffsetValue(calcOffset);
        onDragChange?.(calcOffset);
    };


    const onDragStop: EventHandle = e => {
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragStop);

        dragRef.current.flag = false;
    };

    const onDragMove: EventHandle = e => {
        e.preventDefault();
        updateOffset(e);
    };

    const onDragStart: EventHandle = e => {
        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragStop);

        dragRef.current.flag = true;
    };

    return [offsetValue, onDragStart];
}

export default useColorDrag;
