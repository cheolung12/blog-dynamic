import { useQuery } from '@tanstack/react-query';
import { createClient } from './supabase/client';

const supabase = createClient();

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('category');

      return Array.from(new Set(data?.map((d) => d.category)));
    },
  });

export const usePlainText = (markdownText: string): string => {
  // 헤더 제거
  let plainText = markdownText.replace(/#+\s/g, '');
  // 리스트 항목 제거
  plainText = plainText.replace(/-\s/g, '');
  // 굵게, 기울임꼴, 취소선 제거
  plainText = plainText.replace(/\*\*?|__?|~~/g, '');
  // 이미지 ![](링크), 링크 [](링크) 제거
  plainText = plainText.replace(/!\[.*?\]\(.*?\)|\[.*?\]\(.*?\)/g, '');
  // 코드 블록 제거
  plainText = plainText.replace(/```[\s\S]*?```| {4,}.*\n/g, '');
  // 블록 인용문 제거
  plainText = plainText.replace(/^>\s?/gm, '');
  // HTML <br /> 태그 제거
  plainText = plainText.replace(/<br\s*\/?>/gi, '');
  // HTML <span> 태그 및 내용 제거 (태그 내의 내용은 유지)
  plainText = plainText.replace(/<span[^>]*>(.*?)<\/span>/gi, '$1');

  return plainText;
};
