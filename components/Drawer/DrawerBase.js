"use client"

import { useRef, useEffect } from 'react';
import './DrawerBase.css';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import useMountTransition from '@/hooks/useMountTransition';

function createPortalRoot() {
	const drawerRoot = document.createElement('div');
	drawerRoot.setAttribute('id', 'drawer-root');
  
	return drawerRoot;
}

export default function DrawerBase({ isOpen, children, className, onClose, position = 'left', removeWhenClosed = true }){

	const portalRootRef = useRef(document.getElementById('drawer-root') || createPortalRoot());
	const isTransitioning = useMountTransition(isOpen, 300);
	const bodyRef = useRef(document.querySelector('body'));
	console.log(bodyRef)

	useEffect(() => {
		bodyRef.current.appendChild(portalRootRef.current);
		const portal = portalRootRef.current;
		const bodyEl = bodyRef.current;
	
		return () => {
		  portal.remove();
		  bodyEl.style.overflow = '';
		}
	}, []);
	
	useEffect(() => {
		const updatePageScroll = () => {
		  if (isOpen) {
			bodyRef.current.style.overflow = 'hidden';
		  } else {
			bodyRef.current.style.overflow = '';
		  }
		};
	
		updatePageScroll();
	}, [isOpen]);

	if (!isTransitioning && removeWhenClosed && !isOpen) {
		return null;
	}


	return createPortal(
		<div
		  aria-hidden={isOpen ? 'false' : 'true'}
		  className={cn('drawer-container', {
			open: isOpen,
			in: isTransitioning,
			className
		  })}
		>
		  <div
			className={cn('drawer', position)}
			role="dialog"
		  >
			{children}
		  </div>
		  <div className="backdrop" onClick={onClose} />
		</div>,
		portalRootRef.current,
	);
}