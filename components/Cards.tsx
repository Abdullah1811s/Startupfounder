import React from 'react';
import { convertDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types';

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const Cards = ({ post }: { post: StartupCardType }) => {
  const {
    _createdAt,
    title,
    author,
    description,
    category,
    image,
    views,
    slug,
  } = post;

  const authorId = author?._id;
  const authorName = author?.name;
 
  return (
    <li className="startup-card">
      {/* Header */}
      <div className="flex-between">
        <p>{convertDate(_createdAt)}</p>
        <div className="flex">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-6-medium">{views ?? 0}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-between gap-3 mt-3">
        <div className="flex-1">
          {authorName && (
            <Link href={`/user/${authorId}`}>
              <p className="text-16-medium line-clamp-1">{authorName}</p>
            </Link>
          )}
          {title && (
            <Link href={`/startup/${slug?.current}`}>
              <h3 className="text-26-semibold">{title}</h3>
            </Link>
          )}
        </div>
        {authorId && (
          <Link href={`/user/${authorId}`}>
            <Image
              src={author?.image || "https://placeholder.co/48x48"}
              alt={authorName || "Author"}
              width={48}
              height={48}
              className="rounded-full border-2"
            />
          </Link>
        )}
      </div>

     
      {description && slug?.current && (
        <Link href={`/startup/${slug.current}`} prefetch={true}>
          <p className="startup-card_desc">{description}</p>
          {image && (
            <img
              src={image}
              alt="Startup"
              className="startup-card-img"
            />
          )}
        </Link>
      )}

      {/* Footer */}
      <div className="flex-between gap-3 mt-5">
        {category && (
          <Link href={`/?query=${category.toLowerCase()}`}>
            <p className="text-16-medium">{category}</p>
          </Link>
        )}
        {slug?.current && (
          <Button className="startup-card_btn" asChild>
            <Link href={`/startup/${slug.current}`}>Details</Link>
          </Button>
        )}
      </div>
    </li>
  );
};

export default Cards;
