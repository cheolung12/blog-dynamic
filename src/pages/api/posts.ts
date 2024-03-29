import { Post, PostRequest } from '@/types';
import { usePlainText } from '@/utils/hooks';
import { createClient } from '@/utils/supabase/server';
import type { StorageError } from '@supabase/storage-js';
import formidable from 'formidable';
import { readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | StorageError>,
) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const form = formidable();
  
  const [fields, files] = await form.parse(req);
  let thumbnail: string | null = null;
  
  const supabase = await createClient(req.cookies);
  
  if (files.thumbnail?.length === 1) {
    const file = files.thumbnail[0];
    const fileContent = await readFileSync(file.filepath);
    const fileName = `${file.newFilename}_${file.originalFilename}`;

    const { data: uploadData, error } = await supabase.storage
      .from('blog-thumbnail')
      .upload(fileName, fileContent, {
        contentType: file.mimetype ?? undefined,
      });
    if (error) {
      res.status(403).json(error);
    }
    if (uploadData?.path) {
      const { data } = await supabase.storage
        .from('blog-thumbnail')
        .getPublicUrl(uploadData.path);
      thumbnail = data.publicUrl;
    }
  }

  const { title, category, content } = fields;
  const plainText = usePlainText(content?.[0] as string);

  const postRequest = await {
    title: title?.[0],
    category: category?.[0],
    content: content?.[0],
    description: plainText,
    thumbnail,
  } as PostRequest;

  const { data } = await supabase.from('Post').insert([postRequest]).select();

  if (data && data.length === 1) {
    res.status(200).json(data[0]);
  } else res.status(500).end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};