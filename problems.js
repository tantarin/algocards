const P = [
// ===== BACKTRACKING =====
{id:"bt1",t:"Generate Parentheses (22)",p:"Backtracking",d:"средне",
desc:`На вход получаем число n.
Необходимо сгенерировать все допустимые комбинации скобок, заданные n парами.

Допустимая комбинация означает:
- Каждой открывающей скобке ( соответствует закрывающая )
- При чтении слева направо количество закрывающих никогда не превышает количество открывающих

Пример:
n = 1 → "()"
n = 2 → "(())", "()()"
n = 3 → "((()))", "(()())", "(())()", "()(())", "()()()"`,
hint:`Два счётчика open/close. Если open < n — добавляем '(', если close < open — добавляем ')'. По сути перебираем все варианты, но соблюдаем ограничения.`,
code:`class Solution {
    private List<String> result = new ArrayList<>();
    private int pairCount;

    public List<String> generateParenthesis(int n) {
        this.pairCount = n;
        backtrack(0, 0, "");
        return result;
    }

    private void backtrack(int openCount, int closeCount,
                           String currentString) {
        if (openCount > pairCount || closeCount > pairCount
            || openCount < closeCount) {
            return;
        }

        if (openCount == pairCount && closeCount == pairCount) {
            result.add(currentString);
            return;
        }

        backtrack(openCount + 1, closeCount,
                  currentString + "(");
        backtrack(openCount, closeCount + 1,
                  currentString + ")");
    }
}`,
expl:`Поиск в глубину с отсечением ветвей (DFS + pruning).
Отслеживаем open (открывающие) и close (закрывающие).
- Не добавляем больше n каждого типа
- close никогда не превышает open
- Когда open == close == n — допустимая комбинация найдена`},

{id:"bt2",t:"Декартово произведение",p:"Backtracking",d:"средне",
desc:`Дано N массивов. Вернуть декартово произведение — все комбинации, где из каждого массива выбран ровно один элемент.

Пример:
Ввод: [[1,2],[3],[4,5]]
Вывод: [[1,3,4],[1,3,5],[2,3,4],[2,3,5]]`,
hint:`Рекурсивно выбираем по одному элементу из каждого массива. После рекурсии — откатываем выбор (backtrack).`,
code:`class Solution {
    private List<List<Integer>> result = new ArrayList<>();

    public List<List<Integer>> cartesianProduct(
            List<List<Integer>> arrays) {
        backtrack(arrays, 0, new ArrayList<>());
        return result;
    }

    private void backtrack(List<List<Integer>> arrays,
                           int idx,
                           List<Integer> current) {
        if (idx == arrays.size()) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int val : arrays.get(idx)) {
            current.add(val);
            backtrack(arrays, idx + 1, current);
            current.remove(current.size() - 1);
        }
    }
}`,
expl:`На каждом уровне рекурсии выбираем элемент из соответствующего массива. После возврата удаляем последний элемент (backtrack). Когда idx == arrays.size() — комбинация готова.`},

{id:"bt3",t:"Перебор IP-адресов",p:"Backtracking",d:"средне",
desc:`Дана строка, содержащая только цифры. Вернуть все возможные валидные IP-адреса.

Валидный IP: 4 октета, каждый 0–255, без ведущих нулей.

Пример:
Ввод: "25525511135"
Вывод: ["255.255.11.135", "255.255.111.35"]`,
hint:`Пробуем взять 1–3 цифры на каждый октет. Проверяем: значение 0–255, нет ведущих нулей. Всего 4 части.`,
code:`class Solution {
    private List<String> result = new ArrayList<>();

    public List<String> restoreIpAddresses(String s) {
        backtrack(s, 0, new ArrayList<>());
        return result;
    }

    private void backtrack(String s, int start,
                           List<String> parts) {
        if (parts.size() == 4) {
            if (start == s.length()) {
                result.add(String.join(".", parts));
            }
            return;
        }

        for (int len = 1; len <= 3; len++) {
            if (start + len > s.length()) break;
            String segment = s.substring(start, start + len);
            if (segment.length() > 1
                && segment.startsWith("0")) break;
            int val = Integer.parseInt(segment);
            if (val > 255) break;

            parts.add(segment);
            backtrack(s, start + len, parts);
            parts.remove(parts.size() - 1);
        }
    }
}`,
expl:`Разбиваем строку на 4 октета. Для каждого пробуем 1–3 цифры. Проверяем валидность: 0–255 без ведущих нулей. Когда 4 части и строка кончилась — IP найден.`},

{id:"bt4",t:"Remove Invalid Parentheses (301)",p:"Backtracking",d:"сложно",
desc:`Дана строка, содержащая скобки и другие символы. Удалить минимальное количество невалидных скобок, чтобы строка стала валидной. Вернуть все уникальные результаты.

Пример:
Ввод: "()())()"
Вывод: ["(())()", "()()()" ]

Ввод: "(a)())()"
Вывод: ["(a())()", "(a)()()" ]`,
hint:`Подсчитать лишние ( и ). Затем backtrack: пробуем удалить каждую скобку, отсекаем дубликаты.`,
code:`class Solution {
    private Set<String> result = new HashSet<>();

    public List<String> removeInvalidParentheses(String s) {
        int openToRemove = 0, closeToRemove = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') openToRemove++;
            else if (c == ')') {
                if (openToRemove > 0) openToRemove--;
                else closeToRemove++;
            }
        }
        backtrack(s, 0, openToRemove, closeToRemove);
        return new ArrayList<>(result);
    }

    private void backtrack(String s, int start,
                           int openRem, int closeRem) {
        if (openRem == 0 && closeRem == 0) {
            if (isValid(s)) result.add(s);
            return;
        }

        for (int i = start; i < s.length(); i++) {
            if (i > start && s.charAt(i) == s.charAt(i - 1))
                continue;
            char c = s.charAt(i);
            String next = s.substring(0, i)
                        + s.substring(i + 1);
            if (c == '(' && openRem > 0)
                backtrack(next, i, openRem - 1, closeRem);
            if (c == ')' && closeRem > 0)
                backtrack(next, i, openRem, closeRem - 1);
        }
    }

    private boolean isValid(String s) {
        int count = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') count++;
            else if (c == ')') count--;
            if (count < 0) return false;
        }
        return count == 0;
    }
}`,
expl:`Считаем лишние открывающие и закрывающие скобки. Backtrack: пробуем удалить каждую, пропуская дубликаты (если s[i]==s[i-1]). Когда обе счётчика == 0, проверяем валидность строки.`},

// ===== BINARY SEARCH =====
{id:"bs1",t:"Поиск в повернутом массиве (33)",p:"Binary Search",d:"средне",
desc:`Дан целочисленный массив nums, изначально отсортированный по возрастанию, содержащий уникальные значения. Массив мог быть повернут влево в некоторой неизвестной точке k.

Найти заданное target значение и вернуть его индекс. Если не найдено — вернуть -1.

Пример:
Ввод: nums = [4,5,6,7,0,1,2], target = 0
Вывод: 4`,
hint:`Модифицированный бинарный поиск. Определяем какая половина отсортирована, проверяем лежит ли target в ней.`,
code:`class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid;
            }

            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target
                    && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (nums[mid] < target
                    && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}`,
expl:`O(log n) — пространство поиска уменьшается вдвое на каждой итерации. Одна из половин всегда отсортирована. Проверяем, попадает ли target в отсортированную часть.`},

{id:"bs2",t:"Поиск первой и последней позиции (34)",p:"Binary Search",d:"средне",
desc:`Дан отсортированный массив целых чисел nums и значение target. Найти первую и последнюю позиции target. O(log n).

Пример:
Ввод: nums = [5,7,7,8,8,10], target = 8
Вывод: [3, 4]

Ввод: nums = [5,7,7,8,8,10], target = 6
Вывод: [-1, -1]`,
hint:`Два бинарных поиска: один ищет левую границу, другой — правую.`,
code:`class Solution {
    public int[] searchRange(int[] nums, int target) {
        return new int[]{
            findLeft(nums, target),
            findRight(nums, target)
        };
    }

    private int findLeft(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1, result = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                result = mid;
                hi = mid - 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return result;
    }

    private int findRight(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1, result = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                result = mid;
                lo = mid + 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return result;
    }
}`,
expl:`Для левой границы: при nums[mid]==target идём влево (hi=mid-1). Для правой: идём вправо (lo=mid+1). Оба поиска O(log n).`},

{id:"bs3",t:"Поиск в сортированном массиве (37)",p:"Binary Search",d:"легко",
desc:`Стандартный бинарный поиск в отсортированном массиве. Вернуть индекс элемента или -1, если не найден.

Пример:
Ввод: nums = [1,3,5,7,9,11], target = 7
Вывод: 3`,
hint:`Классический подход lo/hi/mid. Сравниваем mid с target и сдвигаем границы.`,
code:`class Solution {
    public int binarySearch(int[] nums, int target) {
        int lo = 0;
        int hi = nums.length - 1;

        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return -1;
    }
}`,
expl:`O(log n) время, O(1) память. На каждом шаге пространство поиска сокращается вдвое.`},

{id:"bs4",t:"Validate BST (98)",p:"Binary Search",d:"средне",
desc:`Проверить, является ли бинарное дерево валидным деревом поиска (BST).

Свойство BST: все значения в левом поддереве < текущий узел < все значения в правом поддереве.

Пример:
    5
   / \\
  1   7
     / \\
    4   8  → false (4 < 5, но находится в правом поддереве)`,
hint:`Передавать min/max границы в рекурсию. Значение должно быть строго между min и max.`,
code:`class Solution {
    public boolean isValidBST(TreeNode root) {
        return isValid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean isValid(TreeNode node,
                            long low, long high) {
        if (node == null) return true;

        if (node.val <= low || node.val >= high) {
            return false;
        }

        return isValid(node.left, low, node.val)
            && isValid(node.right, node.val, high);
    }
}`,
expl:`Рекурсия с границами. Для левого поддерева: max = node.val. Для правого: min = node.val. Используем long чтобы обработать граничные значения Integer.`},

// ===== GEOMETRY-HASH =====
{id:"gh1",t:"Симметрия по оси Y",p:"Geometry Hash",d:"средне",
desc:`Дан массив точек (x, y). Определить, существует ли вертикальная прямая x = c, относительно которой все точки симметричны.

Пример:
Ввод: [[1,1],[3,1],[2,2]]
Вывод: true (ось x = 2)

Ввод: [[1,1],[3,1],[2,3]]
Вывод: false`,
hint:`c = (minX + maxX) / 2. Для каждой точки (x, y) проверяем существование зеркальной (2c - x, y) через HashSet.`,
code:`class Solution {
    public boolean isSymmetric(int[][] points) {
        int minX = Integer.MAX_VALUE;
        int maxX = Integer.MIN_VALUE;
        Set<String> set = new HashSet<>();

        for (int[] p : points) {
            minX = Math.min(minX, p[0]);
            maxX = Math.max(maxX, p[0]);
            set.add(p[0] + "," + p[1]);
        }

        double axis = (minX + maxX) / 2.0;

        for (int[] p : points) {
            double mirrorX = 2 * axis - p[0];
            String mirror = (int) mirrorX + "," + p[1];
            if (mirrorX != (int) mirrorX
                || !set.contains(mirror)) {
                return false;
            }
        }
        return true;
    }
}`,
expl:`Ось симметрии x = (minX + maxX) / 2. Для каждой точки проверяем наличие зеркальной в HashSet. O(n) время и память.`},

{id:"gh2",t:"Строгая симметрия по оси Y",p:"Geometry Hash",d:"средне",
desc:`То же, что и обычная симметрия, но строгая: каждая точка должна иметь ровно одну зеркальную пару. Точка на оси не считается парой сама себе (если она не единственная).

Пример:
Ввод: [[1,1],[3,1],[2,2]]
Вывод: true (ось x=2, точка (2,2) на оси)`,
hint:`Тот же подход, но с дополнительной проверкой строгой биекции.`,
code:`class Solution {
    public boolean isStrictlySymmetric(int[][] points) {
        int minX = Integer.MAX_VALUE;
        int maxX = Integer.MIN_VALUE;
        Map<String, Integer> countMap = new HashMap<>();

        for (int[] p : points) {
            minX = Math.min(minX, p[0]);
            maxX = Math.max(maxX, p[0]);
            String key = p[0] + "," + p[1];
            countMap.merge(key, 1, Integer::sum);
        }

        double axis = (minX + maxX) / 2.0;

        for (int[] p : points) {
            double mirrorX = 2 * axis - p[0];
            if (mirrorX != (int) mirrorX) return false;
            String key = p[0] + "," + p[1];
            String mirror = (int) mirrorX + "," + p[1];
            int countSelf = countMap.getOrDefault(key, 0);
            int countMirror = countMap.getOrDefault(mirror, 0);
            if (countSelf != countMirror) return false;
        }
        return true;
    }
}`,
expl:`Строгая биекция: количество совпадений точки и её зеркала должно совпадать. Точки на оси допустимы. O(n) время и память.`},

{id:"gh3",t:"Отражение линии (356)",p:"Geometry Hash",d:"средне",
desc:`LeetCode 356 — Line Reflection. Дан набор точек на плоскости. Определить, существует ли прямая, параллельная оси Y, которая отражает все точки.

Пример:
Ввод: [[1,1],[-1,1]]
Вывод: true (ось x = 0)

Ввод: [[1,1],[-1,-1]]
Вывод: false`,
hint:`Найти среднюю линию (minX+maxX)/2, проверить все зеркальные точки через HashSet.`,
code:`class Solution {
    public boolean isReflected(int[][] points) {
        int minX = Integer.MAX_VALUE;
        int maxX = Integer.MIN_VALUE;
        Set<String> set = new HashSet<>();

        for (int[] p : points) {
            minX = Math.min(minX, p[0]);
            maxX = Math.max(maxX, p[0]);
            set.add(p[0] + "," + p[1]);
        }

        int sumAxis = minX + maxX;

        for (int[] p : points) {
            int mirrorX = sumAxis - p[0];
            if (!set.contains(mirrorX + "," + p[1])) {
                return false;
            }
        }
        return true;
    }
}`,
expl:`Ось = (minX + maxX) / 2. Вместо деления используем sumAxis = minX + maxX, зеркальная точка: sumAxis - x. Проверяем через HashSet. O(n).`},

// ===== GRAPH =====
{id:"gbfs1",t:"Кратчайший путь в графе",p:"Graph BFS",d:"средне",
desc:`Дан граф как список рёбер edges и две вершины start и end.
Расстояния между вершинами равны 1.
Найти кратчайший путь от start до end.
Вернуть список вершин или пустой список если пути нет.

Пример:
edges = [[1,8],[2,1],[5,1],[3,8],[3,5]], start = 2, end = 5
Вывод: [2, 1, 5]`,
hint:`BFS (поиск в ширину) + карта родителей для восстановления пути. BFS гарантирует кратчайший путь в невзвешенном графе.`,
code:`public class Solution {
    public List<Integer> findShortestPath(
            List<List<Integer>> edges,
            Integer start, Integer end) {

        Map<Integer, List<Integer>> graph =
            new HashMap<>();
        for (List<Integer> edge : edges) {
            int u = edge.get(0), v = edge.get(1);
            graph.putIfAbsent(u, new ArrayList<>());
            graph.putIfAbsent(v, new ArrayList<>());
            graph.get(u).add(v);
            graph.get(v).add(u);
        }

        Queue<Integer> queue = new LinkedList<>();
        queue.add(start);
        Map<Integer, Integer> visited = new HashMap<>();
        visited.put(start, null);

        while (!queue.isEmpty()) {
            int node = queue.poll();
            if (node == end) break;

            for (int nb : graph.getOrDefault(
                    node, new ArrayList<>())) {
                if (!visited.containsKey(nb)) {
                    visited.put(nb, node);
                    queue.add(nb);
                }
            }
        }

        if (!visited.containsKey(end))
            return new ArrayList<>();

        List<Integer> path = new ArrayList<>();
        Integer cur = end;
        while (cur != null) {
            path.add(cur);
            cur = visited.get(cur);
        }
        Collections.reverse(path);
        return path;
    }
}`,
expl:`BFS гарантирует кратчайший путь в невзвешенном графе. Очередь FIFO обрабатывает сначала ближайших соседей. Восстановление пути через карту родителей с обратным обходом от end к start.`},

{id:"gts1",t:"Циклические зависимости",p:"Graph Toposort",d:"средне",
desc:`Дан список зависимостей вида [A зависит от B]. Определить, есть ли циклическая зависимость.

Пример:
Ввод: [["A","B"],["B","C"],["C","A"]]
Вывод: true (цикл A→B→C→A)

Ввод: [["A","B"],["B","C"]]
Вывод: false`,
hint:`Топологическая сортировка (алгоритм Кана): считаем in-degree, удаляем вершины с 0 входящих. Если не все обработаны — цикл.`,
code:`class Solution {
    public boolean hasCycle(List<List<String>> deps) {
        Map<String, List<String>> graph = new HashMap<>();
        Map<String, Integer> indegree = new HashMap<>();

        for (List<String> dep : deps) {
            String from = dep.get(0), to = dep.get(1);
            graph.putIfAbsent(from, new ArrayList<>());
            graph.putIfAbsent(to, new ArrayList<>());
            indegree.putIfAbsent(from, 0);
            indegree.putIfAbsent(to, 0);
            graph.get(from).add(to);
            indegree.merge(to, 1, Integer::sum);
        }

        Queue<String> queue = new LinkedList<>();
        for (var entry : indegree.entrySet()) {
            if (entry.getValue() == 0)
                queue.add(entry.getKey());
        }

        int processed = 0;
        while (!queue.isEmpty()) {
            String node = queue.poll();
            processed++;
            for (String nb : graph.getOrDefault(
                    node, new ArrayList<>())) {
                indegree.merge(nb, -1, Integer::sum);
                if (indegree.get(nb) == 0)
                    queue.add(nb);
            }
        }

        return processed != indegree.size();
    }
}`,
expl:`Алгоритм Кана: считаем in-degree для каждой вершины, добавляем в очередь вершины с 0 входящих. Удаляем их, уменьшая in-degree соседей. Если не все вершины обработаны — граф содержит цикл. O(V+E).`},

// ===== GREEDY =====
{id:"gop1",t:"Best Time to Buy and Sell Stock II (122)",p:"Greedy",d:"легко",
desc:`Дан массив prices, где prices[i] — цена акции в день i.
Можно совершать несколько транзакций (покупку и продажу):
- Покупать и продавать в любой день
- Не более одной акции одновременно
- Можно покупать и продавать в один день

Найти максимальную прибыль.

Пример:
Ввод: prices = [1, 3, 2, 5]
- Покупка день 0 (цена 1), продажа день 1 (цена 3): прибыль = 2
- Покупка день 2 (цена 2), продажа день 3 (цена 5): прибыль = 3
- Итого: 5`,
hint:`Жадный подход: суммируем все положительные разности между соседними днями.`,
code:`class Solution {
    public int maxProfit(int[] prices) {
        int totalProfit = 0;

        for (int day = 1; day < prices.length; day++) {
            int dailyProfit = prices[day] - prices[day - 1];
            totalProfit += Math.max(0, dailyProfit);
        }

        return totalProfit;
    }
}`,
expl:`O(n) время, O(1) память. Один проход — суммируем все положительные разности цен между соседними днями.`},

{id:"gop2",t:"Partition Labels (763)",p:"Greedy",d:"средне",
desc:`Разбить строку на максимальное количество частей так, чтобы каждая буква встречалась не более чем в одной части. Вернуть размеры частей.

Пример:
Ввод: "ababcbacadefegdehijhklij"
Вывод: [9, 7, 8]

Часть "ababcbaca" содержит все a, b, c.
Часть "defegde" содержит все d, e, f.
Часть "hijhklij" содержит все h, i, j, k, l.`,
hint:`Записать последнее вхождение каждого символа. Расширять партицию пока i не достигнет maxReach.`,
code:`class Solution {
    public List<Integer> partitionLabels(String s) {
        int[] lastOccurrence = new int[26];
        for (int i = 0; i < s.length(); i++) {
            lastOccurrence[s.charAt(i) - 'a'] = i;
        }

        List<Integer> result = new ArrayList<>();
        int partitionStart = 0;
        int maxReach = 0;

        for (int i = 0; i < s.length(); i++) {
            maxReach = Math.max(maxReach,
                lastOccurrence[s.charAt(i) - 'a']);
            if (i == maxReach) {
                result.add(i - partitionStart + 1);
                partitionStart = i + 1;
            }
        }

        return result;
    }
}`,
expl:`Для каждого символа запоминаем его последнюю позицию. Идём по строке, расширяя текущую партицию до maxReach. Когда i == maxReach — партиция завершена. O(n).`},

{id:"gop3",t:"Разбиение на 3 части",p:"Greedy",d:"легко",
desc:`Дан массив. Разбить его на 3 непустые части. Вернуть минимальную сумму первых элементов каждой части.

Пример:
Ввод: [3, 1, 2, 4, 5]
Вывод: 6 (3 + 1 + 2 = части [3],[1],[2,4,5] или аналогичные)`,
hint:`Первый элемент фиксирован. Нужно найти два минимальных значения из оставшихся позиций (начала второй и третьей части).`,
code:`class Solution {
    public int minSumOfFirstElements(int[] arr) {
        int first = arr[0];
        int min1 = Integer.MAX_VALUE;
        int min2 = Integer.MAX_VALUE;

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min1) {
                min2 = min1;
                min1 = arr[i];
            } else if (arr[i] < min2) {
                min2 = arr[i];
            }
        }

        return first + min1 + min2;
    }
}`,
expl:`Первый элемент всегда начинает первую часть. Из позиций 1..n-1 выбираем два минимальных — это начала второй и третьей частей. O(n).`},

{id:"gop4",t:"Подотрезок с минимумом X",p:"Greedy",d:"средне",
desc:`Найти самый длинный подотрезок массива, в котором минимум равен x.

Пример:
Ввод: [0, 2, 4, 0], x = 2
Вывод: 2 (подотрезок [2, 4])

Условия: все элементы в окне >= x, и хотя бы один == x.`,
hint:`Скользящее окно. Элементы < x — разделители. Отслеживаем флаг наличия x в окне.`,
code:`class Solution {
    public int longestSubarrayWithMinX(int[] arr, int x) {
        int result = 0;
        int left = 0;
        boolean hasTarget = false;

        for (int right = 0; right < arr.length; right++) {
            if (arr[right] < x) {
                left = right + 1;
                hasTarget = false;
                continue;
            }
            if (arr[right] == x) hasTarget = true;
            if (hasTarget) {
                result = Math.max(result, right - left + 1);
            }
        }

        return result;
    }
}`,
expl:`Все элементы в окне должны быть >= x, и хотя бы один == x. Элементы < x разрывают окно. Сдвигаем left и сбрасываем hasTarget. O(n).`},

{id:"gop5",t:"Поиск монотонной последовательности",p:"Greedy",d:"средне",
desc:`Найти самый длинный строго монотонный (возрастающий или убывающий) подотрезок. Вернуть [start, end].

Пример:
Ввод: [2, 7, 5, 4, 4, 3]
Вывод: [1, 3] (подотрезок [7, 5, 4] — строго убывающий, длина 3)`,
hint:`Отслеживать длину возрастающей и убывающей подпоследовательности. Сбрасывать при смене направления или равных элементах.`,
code:`class Solution {
    public int[] longestMonotone(int[] arr) {
        if (arr.length <= 1)
            return new int[]{0, arr.length - 1};

        int incLen = 1, decLen = 1;
        int maxLen = 1;
        int bestEnd = 0;
        boolean bestIsInc = true;

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > arr[i - 1]) {
                incLen++;
                decLen = 1;
            } else if (arr[i] < arr[i - 1]) {
                decLen++;
                incLen = 1;
            } else {
                incLen = 1;
                decLen = 1;
            }

            if (incLen > maxLen) {
                maxLen = incLen;
                bestEnd = i;
                bestIsInc = true;
            }
            if (decLen > maxLen) {
                maxLen = decLen;
                bestEnd = i;
                bestIsInc = false;
            }
        }

        return new int[]{bestEnd - maxLen + 1, bestEnd};
    }
}`,
expl:`Ведём два счётчика: incLen и decLen. При смене направления или равных элементах сбрасываем. Запоминаем лучший результат. O(n).`},

{id:"gop6",t:"Расстояние между X и Y",p:"Greedy",d:"средне",
desc:`Дана строка из символов X, Y и O. Найти кратчайшее расстояние между X и Y.

Пример:
Ввод: "OOOXOOYOXO"
Вывод: 2 (между X на позиции 7 и Y на позиции 6)`,
hint:`Отслеживать lastX и lastY. Обновлять минимальное расстояние при нахождении любого из них.`,
code:`class Solution {
    public int minDistanceXY(String s) {
        int lastX = -1, lastY = -1;
        int result = Integer.MAX_VALUE;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == 'X') {
                lastX = i;
                if (lastY != -1)
                    result = Math.min(result, i - lastY);
            } else if (c == 'Y') {
                lastY = i;
                if (lastX != -1)
                    result = Math.min(result, i - lastX);
            }
        }

        return result == Integer.MAX_VALUE ? -1 : result;
    }
}`,
expl:`Минимальное расстояние всегда достигается парой соседних X и Y по позиции. Один проход, обновляем lastX/lastY и result. O(n).`},

{id:"gop7",t:"Половины с разницей ≤ k",p:"Greedy",d:"средне",
desc:`Дан массив чётной длины. Переставить элементы так, чтобы в обеих половинах попарная разница ≤ k. Вернуть переставленный массив.

Пример:
Ввод: [8, 3, 5, 4, 7, 6], k = 2
Вывод: [3, 4, 5, 6, 7, 8]`,
hint:`Все элементы в каждой половине должны лежать в интервале [min, min+k]. Сортируем и разбиваем на группы.`,
code:`class Solution {
    public int[] rearrangeHalves(int[] arr, int k) {
        Arrays.sort(arr);
        int n = arr.length;
        int half = n / 2;

        List<Integer> lowGroup = new ArrayList<>();
        List<Integer> highGroup = new ArrayList<>();
        List<Integer> midGroup = new ArrayList<>();

        int minVal = arr[0];
        int maxVal = arr[n - 1];

        for (int val : arr) {
            if (val <= minVal + k) {
                lowGroup.add(val);
            } else if (val >= maxVal - k) {
                highGroup.add(val);
            } else {
                midGroup.add(val);
            }
        }

        int[] result = new int[n];
        int idx = 0;
        for (int v : lowGroup) result[idx++] = v;
        for (int v : midGroup) result[idx++] = v;
        for (int v : highGroup) result[idx++] = v;

        return result;
    }
}`,
expl:`Сортируем массив. Распределяем по группам: близкие к min, близкие к max, и промежуточные. Каждая половина отсортированного массива автоматически удовлетворяет условию разницы ≤ k.`},

{id:"gop8",t:"Оптимизация маршрута",p:"Greedy",d:"средне",
desc:`Дан путь из команд U/D/L/R (вверх/вниз/лево/право). Удалить все петли (когда возвращаемся в уже посещённую точку).

Пример:
Ввод: ["R","D","L","U","R"]
Вывод: ["R"] (R→D→L→U — петля, убираем, остаётся R)`,
hint:`Множество посещённых координат. При повторном посещении — разматываем путь обратно до этой точки.`,
code:`class Solution {
    public List<String> optimizeRoute(String[] moves) {
        List<String> result = new ArrayList<>();
        List<int[]> coords = new ArrayList<>();
        Set<String> visited = new HashSet<>();

        int x = 0, y = 0;
        coords.add(new int[]{x, y});
        visited.add(x + "," + y);

        for (String move : moves) {
            switch (move) {
                case "U": y++; break;
                case "D": y--; break;
                case "L": x--; break;
                case "R": x++; break;
            }

            String key = x + "," + y;
            if (visited.contains(key)) {
                while (true) {
                    int[] last = coords.get(
                        coords.size() - 1);
                    String lastKey =
                        last[0] + "," + last[1];
                    if (lastKey.equals(key)) break;
                    visited.remove(lastKey);
                    coords.remove(coords.size() - 1);
                    result.remove(result.size() - 1);
                }
            } else {
                visited.add(key);
                coords.add(new int[]{x, y});
                result.add(move);
            }
        }

        return result;
    }
}`,
expl:`Отслеживаем посещённые точки. При повторном посещении разматываем путь (удаляем координаты и команды) до точки совпадения — это и есть петля. O(n) амортизировано.`},

{id:"gop9",t:"Maximize Distance to Closest Person (849)",p:"Greedy",d:"средне",
desc:`Дан массив seats из 0 и 1, где 1 — занятое место. Найти максимальное расстояние до ближайшего занятого места, если сесть на оптимальное свободное.

Пример:
Ввод: [1, 0, 0, 0, 1, 0, 1]
Вывод: 2 (сесть на позицию 2)

Ввод: [1, 0, 0, 0]
Вывод: 3 (сесть на позицию 3)`,
hint:`Три случая: начальные нули, конечные нули, нули между двумя единицами. Для середины расстояние = gap/2.`,
code:`class Solution {
    public int maxDistToClosest(int[] seats) {
        int n = seats.length;
        int prev = -1;
        int best = 0;

        for (int i = 0; i < n; i++) {
            if (seats[i] == 1) {
                if (prev == -1) {
                    best = i;
                } else {
                    best = Math.max(best, (i - prev) / 2);
                }
                prev = i;
            }
        }

        best = Math.max(best, n - 1 - prev);

        return best;
    }
}`,
expl:`O(n) один проход. Три случая: начальные нули (расстояние = позиция первой 1), промежуток между двумя 1 (расстояние = gap/2), конечные нули (расстояние = n-1-lastOne).`},

// ===== HASHMAP =====
{id:"hf1",t:"Group Anagrams (49)",p:"HashMap",d:"средне",
desc:`Дан массив строк strs. Сгруппировать все анаграммы вместе.
Анаграммы — слова с одинаковыми символами в разном порядке.

Пример:
Ввод: ["eat","tea","tan","ate","nat","bat"]
Вывод: [["eat","tea","ate"],["tan","nat"],["bat"]]

Порядок групп и строк внутри группы не важен.`,
hint:`HashMap + частотный ключ. Для каждой строки считаем частоту символов и строим ключ через разделитель #.`,
code:`class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();

        for (String s : strs) {
            int[] cnt = new int[26];
            for (int i = 0; i < s.length(); i++) {
                cnt[s.charAt(i) - 'a']++;
            }

            String key = buildKey(cnt);
            map.computeIfAbsent(key,
                k -> new ArrayList<>()).add(s);
        }

        return new ArrayList<>(map.values());
    }

    private String buildKey(int[] cnt) {
        StringBuilder sb = new StringBuilder(26 * 2);
        for (int x : cnt) {
            sb.append('#').append(x);
        }
        return sb.toString();
    }
}`,
expl:`O(n × k) время, O(n × k) память, где k — максимальная длина строки. Все анаграммы дают одинаковый частотный ключ.`},

{id:"hf2",t:"Слово-анаграмма (242)",p:"HashMap",d:"легко",
desc:`Проверить, является ли строка t анаграммой строки s.

Пример:
Ввод: s = "anagram", t = "nagaram"
Вывод: true

Ввод: s = "rat", t = "car"
Вывод: false`,
hint:`Массив счётчиков [26]. +1 для символов s, -1 для символов t. Если все нули — анаграмма.`,
code:`class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] count = new int[26];

        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }

        for (int c : count) {
            if (c != 0) return false;
        }

        return true;
    }
}`,
expl:`Частотный подсчёт. Если все счётчики равны нулю — строки являются анаграммами. O(n) время, O(1) память.`},

{id:"hf3",t:"Изоморфные строки (205)",p:"HashMap",d:"средне",
desc:`Проверить, являются ли строки s и t изоморфными. Каждый символ s можно заменить на символ t с сохранением порядка. Биекция: разные символы не могут отображаться в один.

Пример:
Ввод: s = "egg", t = "add"
Вывод: true (e→a, g→d)

Ввод: s = "foo", t = "bar"
Вывод: false (o→a и o→r — конфликт)`,
hint:`Две карты: s→t и t→s для обеспечения биекции. Конфликт в любой — не изоморфны.`,
code:`class Solution {
    public boolean isIsomorphic(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] mapST = new int[256];
        int[] mapTS = new int[256];
        Arrays.fill(mapST, -1);
        Arrays.fill(mapTS, -1);

        for (int i = 0; i < s.length(); i++) {
            char cs = s.charAt(i);
            char ct = t.charAt(i);

            if (mapST[cs] == -1 && mapTS[ct] == -1) {
                mapST[cs] = ct;
                mapTS[ct] = cs;
            } else if (mapST[cs] != ct
                    || mapTS[ct] != cs) {
                return false;
            }
        }

        return true;
    }
}`,
expl:`Две карты для биекции s→t и t→s. При конфликте (символ уже отображён в другой) — не изоморфны. O(n) время, O(1) память (фикс. массивы 256).`},

{id:"hf4",t:"Удаление лишних дубликатов",p:"HashMap",d:"легко",
desc:`Дан массив и число n. Оставить не более n вхождений каждого элемента.

Пример:
Ввод: [1, 2, 1, 2, 1, 2], n = 2
Вывод: [1, 2, 1, 2]`,
hint:`HashMap-счётчик. Добавляем элемент в результат только если его count < n.`,
code:`class Solution {
    public List<Integer> removeDuplicates(int[] arr, int n) {
        Map<Integer, Integer> count = new HashMap<>();
        List<Integer> result = new ArrayList<>();

        for (int val : arr) {
            int cnt = count.getOrDefault(val, 0);
            if (cnt < n) {
                result.add(val);
                count.put(val, cnt + 1);
            }
        }

        return result;
    }
}`,
expl:`Подсчёт количества вхождений через HashMap. Пропускаем элемент, если его счётчик уже >= n. O(n) время и память.`},

{id:"hf5",t:"Перестановка букв и палиндром",p:"HashMap",d:"средне",
desc:`Можно ли переставить символы строки так, чтобы получился палиндром?

Пример:
Ввод: "cabab"
Вывод: true (можно составить "abcba")

Ввод: "abc"
Вывод: false`,
hint:`Палиндром: все символы с чётной частотой, максимум один с нечётной (для центра).`,
code:`class Solution {
    public boolean canFormPalindrome(String s) {
        int[] count = new int[26];

        for (char c : s.toCharArray()) {
            count[c - 'a']++;
        }

        int oddCount = 0;
        for (int c : count) {
            if (c % 2 != 0) oddCount++;
        }

        return oddCount <= 1;
    }
}`,
expl:`Палиндром допускает не более одного символа с нечётной частотой (центральный символ для строк нечётной длины). O(n) время, O(1) память.`},

{id:"hf6",t:"Маршрут туриста",p:"HashMap",d:"средне",
desc:`Даны авиабилеты в виде пар [откуда, куда]. Восстановить маршрут.

Пример:
Ввод: [["Moscow","Yerevan"],["Vladivostok","Moscow"]]
Вывод: ["Vladivostok", "Moscow", "Yerevan"]`,
hint:`Начальный город — тот, которого нет во множестве городов назначения. Далее следуем по цепочке через HashMap.`,
code:`class Solution {
    public List<String> reconstructRoute(
            String[][] tickets) {
        Set<String> destinations = new HashSet<>();
        Map<String, String> mapping = new HashMap<>();

        for (String[] ticket : tickets) {
            mapping.put(ticket[0], ticket[1]);
            destinations.add(ticket[1]);
        }

        String start = null;
        for (String[] ticket : tickets) {
            if (!destinations.contains(ticket[0])) {
                start = ticket[0];
                break;
            }
        }

        List<String> route = new ArrayList<>();
        String current = start;
        while (current != null) {
            route.add(current);
            current = mapping.get(current);
        }

        return route;
    }
}`,
expl:`Начальный город — единственный, который не встречается как пункт назначения. Далее идём по цепочке mapping. O(n) время и память.`},

// ===== HEAP =====
{id:"hpq1",t:"K наиболее частых элементов (347)",p:"Heap / PQ",d:"средне",
desc:`Дан массив целых чисел nums и число k.
Найти и вернуть k наиболее часто встречающихся элементов.
Гарантируется уникальность ответа.

Пример:
nums = [1,1,1,2,2,3], k = 2
Элемент 1 — 3 раза, 2 — 2 раза, 3 — 1 раз.
Вывод: [1, 2]`,
hint:`Считаем частоту через HashMap, затем min-heap размера k. Если размер > k — удаляем минимальный.`,
code:`class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : nums) {
            frequencyMap.merge(num, 1, Integer::sum);
        }

        PriorityQueue<Map.Entry<Integer, Integer>> minHeap =
            new PriorityQueue<>(
                Comparator.comparingInt(Map.Entry::getValue));

        for (Map.Entry<Integer, Integer> entry
             : frequencyMap.entrySet()) {
            minHeap.offer(entry);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        return minHeap.stream()
            .mapToInt(Map.Entry::getKey)
            .toArray();
    }
}`,
expl:`O(n log k) время, O(k) память для кучи. Min-heap хранит только k самых частых элементов. При переполнении удаляем наименее частый.`},

{id:"hpq2",t:"Top K Frequent Words (692)",p:"Heap / PQ",d:"средне",
desc:`Дан массив строк words и число k. Найти k самых частых слов. При равной частоте — лексикографический порядок.

Пример:
Ввод: words = ["i","love","leetcode","i","love","coding"], k = 2
Вывод: ["i", "love"]`,
hint:`Частотная карта + min-heap с кастомным компаратором: по частоте возрастающе, при равенстве — по слову убывающе.`,
code:`class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        Map<String, Integer> freqMap = new HashMap<>();
        for (String w : words) {
            freqMap.merge(w, 1, Integer::sum);
        }

        PriorityQueue<Map.Entry<String, Integer>> minHeap =
            new PriorityQueue<>((a, b) -> {
                if (!a.getValue().equals(b.getValue())) {
                    return a.getValue() - b.getValue();
                }
                return b.getKey().compareTo(a.getKey());
            });

        for (var entry : freqMap.entrySet()) {
            minHeap.offer(entry);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        List<String> result = new ArrayList<>();
        while (!minHeap.isEmpty()) {
            result.add(minHeap.poll().getKey());
        }
        Collections.reverse(result);
        return result;
    }
}`,
expl:`Min-heap с кастомным компаратором: частота по возрастанию, слово по убыванию (обратный лексикографический). При извлечении переворачиваем результат. O(n log k).`},

// ===== INTERVALS =====
{id:"iss1",t:"Merge Intervals (56)",p:"Intervals Sweep",d:"средне",
desc:`Дан список отрезков [начало, конец]. Необходимо объединить все пересекающиеся отрезки.

Примеры:
- [1,3] и [2,6] перекрываются → [1,6]
- [1,4] и [4,5] перекрываются (общая точка 4) → [1,5]
- [1,2] и [3,4] не перекрываются

Ввод: [[1,3],[2,6],[8,10],[15,18]]
Вывод: [[1,6],[8,10],[15,18]]`,
hint:`Сортируем по началу. Идём слева направо, расширяем текущий интервал или начинаем новый.`,
code:`class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals,
            Comparator.comparingInt(a -> a[0]));

        List<int[]> merged = new ArrayList<>();

        int currentStart = intervals[0][0];
        int currentEnd   = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            int nextStart = intervals[i][0];
            int nextEnd   = intervals[i][1];

            if (currentEnd < nextStart) {
                merged.add(
                    new int[]{currentStart, currentEnd});
                currentStart = nextStart;
                currentEnd   = nextEnd;
            } else {
                currentEnd =
                    Math.max(currentEnd, nextEnd);
            }
        }

        merged.add(new int[]{currentStart, currentEnd});
        return merged.toArray(new int[merged.size()][]);
    }
}`,
expl:`O(n log n) сортировка + O(n) линейный проход. Если текущий конец < следующее начало — нет пересечения. Иначе расширяем конец.`},

{id:"iss2",t:"Пересекающиеся отрезки",p:"Intervals Sweep",d:"средне",
desc:`Найти все отрезки, которые пересекаются хотя бы с одним другим.

Пример:
Ввод: [[6,8],[1,5],[4,7]]
Вывод: [[1,5],[4,7],[6,8]] (все три пересекаются)`,
hint:`Сортируем по началу. Отслеживаем bestEnd — максимальный конец среди предыдущих. Если текущий start ≤ bestEnd — пересечение.`,
code:`class Solution {
    public List<int[]> findOverlapping(int[][] segs) {
        int n = segs.length;
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++) idx[i] = i;
        Arrays.sort(idx,
            Comparator.comparingInt(i -> segs[i][0]));

        boolean[] overlaps = new boolean[n];
        int bestEnd = segs[idx[0]][1];
        int bestIdx = 0;

        for (int k = 1; k < n; k++) {
            int i = idx[k];
            if (segs[i][0] <= bestEnd) {
                overlaps[i] = true;
                overlaps[idx[bestIdx]] = true;
                if (k > 1) overlaps[idx[k - 1]] = true;
            }
            if (segs[i][1] > bestEnd) {
                bestEnd = segs[i][1];
                bestIdx = k;
            }
        }

        List<int[]> result = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (overlaps[i]) result.add(segs[i]);
        }
        return result;
    }
}`,
expl:`После сортировки проверяем: если текущий start ≤ предыдущий bestEnd, оба отрезка пересекаются. Помечаем флагами. O(n log n).`},

{id:"iss3",t:"Слияние отрезков",p:"Intervals Sweep",d:"средне",
desc:`Объединить пересекающиеся отрезки (аналог Merge Intervals, но с вспомогательными функциями isOverlapping и mergeTwoSegments).

Пример:
Ввод: [[1,3],[2,6],[8,10]]
Вывод: [[1,6],[8,10]]`,
hint:`Сортируем по началу + линейный проход с проверкой пересечения.`,
code:`class Solution {
    private boolean isOverlapping(int[] a, int[] b) {
        return a[0] <= b[1] && b[0] <= a[1];
    }

    private int[] mergeTwoSegments(int[] a, int[] b) {
        return new int[]{
            Math.min(a[0], b[0]),
            Math.max(a[1], b[1])
        };
    }

    public List<int[]> mergeSegments(int[][] segments) {
        Arrays.sort(segments,
            Comparator.comparingInt(a -> a[0]));

        List<int[]> result = new ArrayList<>();
        int[] current = segments[0];

        for (int i = 1; i < segments.length; i++) {
            if (isOverlapping(current, segments[i])) {
                current = mergeTwoSegments(
                    current, segments[i]);
            } else {
                result.add(current);
                current = segments[i];
            }
        }

        result.add(current);
        return result;
    }
}`,
expl:`Сортируем по началу. Для каждого следующего отрезка проверяем пересечение с текущим. Если пересекаются — объединяем, иначе — начинаем новый. O(n log n).`},

{id:"iss4",t:"Car Pooling (1094)",p:"Intervals Sweep",d:"средне",
desc:`Автомобиль с вместимостью capacity. Список поездок [passengers, from, to]. Можно ли выполнить все поездки?

Пример:
Ввод: trips = [[2,1,5],[3,3,7]], capacity = 4
Вывод: false (на участке 3-5 нужно 5 мест)

Ввод: trips = [[2,1,5],[3,5,7]], capacity = 3
Вывод: true (пассажиры не пересекаются)`,
hint:`Sweep line: массив изменений пассажиров. +passengers на from, -passengers на to. Проверяем переполнение.`,
code:`class Solution {
    public boolean carPooling(int[][] trips,
                              int capacity) {
        int[] passengerChanges = new int[1001];

        for (int[] trip : trips) {
            int passengers = trip[0];
            int from = trip[1];
            int to = trip[2];
            passengerChanges[from] += passengers;
            passengerChanges[to] -= passengers;
        }

        int current = 0;
        for (int change : passengerChanges) {
            current += change;
            if (current > capacity) return false;
        }

        return true;
    }
}`,
expl:`Sweep line: отмечаем +passengers на from и -passengers на to. Проходим массив, считая текущую загрузку. Если превышает capacity — false. O(n + maxLocation).`},

{id:"iss5",t:"Meeting Rooms II (253)",p:"Intervals Sweep",d:"средне",
desc:`Дан список интервалов совещаний. Найти минимальное количество переговорных комнат.

Пример:
Ввод: [[0,30],[5,10],[15,20]]
Вывод: 2

Ввод: [[7,10],[2,4]]
Вывод: 1`,
hint:`Разделить на массивы starts и ends. Отсортировать оба. Два указателя: если start < end — нужна комната, иначе — освобождаем.`,
code:`class Solution {
    public int minMeetingRooms(int[][] intervals) {
        int n = intervals.length;
        int[] starts = new int[n];
        int[] ends = new int[n];

        for (int i = 0; i < n; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }

        Arrays.sort(starts);
        Arrays.sort(ends);

        int rooms = 0, maxRooms = 0;
        int si = 0, ei = 0;

        while (si < n) {
            if (starts[si] < ends[ei]) {
                rooms++;
                maxRooms = Math.max(maxRooms, rooms);
                si++;
            } else {
                rooms--;
                ei++;
            }
        }

        return maxRooms;
    }
}`,
expl:`Сортируем starts и ends отдельно. Если очередной start < end — начинаем новую встречу (rooms++). Иначе — освобождаем комнату (rooms--). O(n log n).`},

// ===== LINKED LIST =====
{id:"ll1",t:"Reverse Linked List (206)",p:"Linked List",d:"легко",
desc:`Дан head односвязного списка. Перевернуть весь список и вернуть начало перевернутого.

Пример:
1 → 2 → 3 → 4 → 5
Вывод: 5 → 4 → 3 → 2 → 1`,
hint:`Три указателя: prev, curr, next. На каждом шаге перенаправляем curr.next на prev.`,
code:`class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode tmp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = tmp;
        }

        return prev;
    }
}`,
expl:`O(n) время — один проход по списку. O(1) память — только три указателя, без дополнительных структур.`},

{id:"ll2",t:"Удалите N-й узел с конца (19)",p:"Linked List",d:"средне",
desc:`Дан связный список. Удалить n-й узел с конца. Вернуть head.

Пример:
Ввод: 1→2→3→4→5, n = 2
Вывод: 1→2→3→5 (удалён 4)`,
hint:`Fast указатель опережает slow на n шагов. Когда fast = null, slow стоит перед удаляемым. Dummy-узел упрощает крайние случаи.`,
code:`class Solution {
    public ListNode removeNthFromEnd(ListNode head,
                                     int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy;
        ListNode slow = dummy;

        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }

        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }

        slow.next = slow.next.next;

        return dummy.next;
    }
}`,
expl:`Два указателя с разницей n+1. Когда fast достигает null, slow стоит перед удаляемым узлом. Dummy-узел обрабатывает случай удаления head. O(n) время, O(1) память.`},

// ===== MATH =====
{id:"ms1",t:"Умножение длинного числа",p:"Math / Simulation",d:"средне",
desc:`Число хранится как массив цифр в обратном порядке. Умножить его на цифру n (1-9). Вернуть результат в том же формате.

Пример:
Ввод: [3, 2, 1] × 2 (число 123 × 2)
Вывод: [6, 4, 2] (число 246)

Ввод: [5, 9] × 3 (число 95 × 3)
Вывод: [5, 8, 2] (число 285)`,
hint:`Поцифровое умножение с переносом (carry). Как умножение столбиком.`,
code:`class Solution {
    public List<Integer> multiplyByDigit(
            List<Integer> num, int n) {
        List<Integer> result = new ArrayList<>();
        int carry = 0;

        for (int digit : num) {
            int product = digit * n + carry;
            result.add(product % 10);
            carry = product / 10;
        }

        while (carry > 0) {
            result.add(carry % 10);
            carry /= 10;
        }

        return result;
    }
}`,
expl:`Умножение столбиком: цифра × n + carry. Остаток от 10 — текущая цифра, целая часть — перенос. O(n) время.`},

{id:"ms2",t:"Сумма hex чисел",p:"Math / Simulation",d:"легко",
desc:`Сложить два шестнадцатеричных числа, представленных строками. Вернуть результат как hex-строку.

Пример:
Ввод: "a" + "5"
Вывод: "f" (10 + 5 = 15)

Ввод: "1a" + "f"
Вывод: "29" (26 + 15 = 41)`,
hint:`Сложение справа налево с переносом в системе счисления 16.`,
code:`class Solution {
    public String addHex(String a, String b) {
        StringBuilder result = new StringBuilder();
        int i = a.length() - 1;
        int j = b.length() - 1;
        int carry = 0;

        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) sum += hexToInt(a.charAt(i--));
            if (j >= 0) sum += hexToInt(b.charAt(j--));
            result.append(intToHex(sum % 16));
            carry = sum / 16;
        }

        return result.reverse().toString();
    }

    private int hexToInt(char c) {
        if (c >= '0' && c <= '9') return c - '0';
        return c - 'a' + 10;
    }

    private char intToHex(int n) {
        if (n < 10) return (char) ('0' + n);
        return (char) ('a' + n - 10);
    }
}`,
expl:`Аналогично десятичному сложению, но в системе 16. Справа налево: складываем цифры + carry. Остаток от 16 — цифра, целая часть — перенос. O(max(a,b)).`},

{id:"ms3",t:"Минимальное произведение",p:"Math / Simulation",d:"легко",
desc:`Найти минимальное произведение двух элементов массива.

Пример:
Ввод: [2, -6, -4, 10, -5]
Вывод: -60 (-6 × 10)

Кандидаты: два наименьших, наименьший × наибольший, два наибольших.`,
hint:`Отслеживаем 4 значения: два минимальных и два максимальных. Проверяем все три кандидата.`,
code:`class Solution {
    public long minProduct(int[] arr) {
        int min1 = Integer.MAX_VALUE;
        int min2 = Integer.MAX_VALUE;
        int max1 = Integer.MIN_VALUE;
        int max2 = Integer.MIN_VALUE;

        for (int val : arr) {
            if (val < min1) {
                min2 = min1;
                min1 = val;
            } else if (val < min2) {
                min2 = val;
            }
            if (val > max1) {
                max2 = max1;
                max1 = val;
            } else if (val > max2) {
                max2 = val;
            }
        }

        long candidate1 = (long) min1 * min2;
        long candidate2 = (long) min1 * max1;
        long candidate3 = (long) max1 * max2;

        return Math.min(candidate1,
            Math.min(candidate2, candidate3));
    }
}`,
expl:`Минимальное произведение может быть: два отрицательных (дают положительный), отрицательный × положительный (дают отрицательный), или два положительных. Проверяем все варианты за O(n).`},

{id:"ms4",t:"Индекс Хирша",p:"Math / Simulation",d:"сложно",
desc:`Дан массив цитирований. Найти h-индекс: максимальное h, при котором h статей имеют ≥ h цитирований.

Пример:
Ввод: [10, 1, 8, 0, 3]
Вывод: 3 (3 статьи имеют ≥ 3 цитирований: 10, 8, 3)

Ввод: [3, 0, 6, 1, 5]
Вывод: 3`,
hint:`Bucket sort. h-индекс ≤ n. Считаем статьи с каждым количеством цитирований, затем суммируем справа.`,
code:`class Solution {
    public int hIndex(int[] citations) {
        int n = citations.length;
        int[] buckets = new int[n + 1];

        for (int c : citations) {
            if (c >= n) {
                buckets[n]++;
            } else {
                buckets[c]++;
            }
        }

        int count = 0;
        for (int i = n; i >= 0; i--) {
            count += buckets[i];
            if (count >= i) {
                return i;
            }
        }

        return 0;
    }
}`,
expl:`O(n) с bucket sort. Создаём buckets[0..n], где buckets[i] = количество статей с i цитированиями (или >= n). Суммируем справа налево: когда count >= i, нашли h-индекс.`},

// ===== PREFIX SUM =====
{id:"ps1",t:"Subarray Sum Equals K (560)",p:"Prefix Sum",d:"средне",
desc:`Дан массив целых чисел nums и число k.
Найти общее количество подмассивов, сумма которых равна k.
Подмассив — непрерывная последовательность элементов.

Пример:
nums = [1, 2, 3], k = 3
Подмассивы с суммой 3: [1,2] и [3] → ответ 2`,
hint:`Хеш-таблица + префиксные суммы. Если prefixSum[j] - prefixSum[i] = k, то сумма подмассива i+1..j = k.`,
code:`class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixSumCount =
            new HashMap<>();
        prefixSumCount.put(0, 1);

        int count = 0;
        int currentSum = 0;

        for (int num : nums) {
            currentSum += num;

            count += prefixSumCount
                .getOrDefault(currentSum - k, 0);

            prefixSumCount
                .merge(currentSum, 1, Integer::sum);
        }

        return count;
    }
}`,
expl:`O(n) время, O(n) память. Один проход: для каждой позиции ищем (currentSum - k) в HashMap. Если найдено — столько подмассивов оканчиваются здесь с суммой k.`},

{id:"ps2",t:"Последовательность с суммой K",p:"Prefix Sum",d:"легко",
desc:`Найти последний индекс первого подмассива с суммой k.

Пример:
Ввод: [1, 2, 3], k = 5
Вывод: 2 (подмассив [2,3] заканчивается на индексе 2)`,
hint:`Та же техника префиксных сумм, но возвращаем индекс при первом совпадении.`,
code:`class Solution {
    public int findSubarrayEnd(int[] nums, int k) {
        Map<Integer, Integer> prefixSumIndex =
            new HashMap<>();
        prefixSumIndex.put(0, -1);

        int currentSum = 0;

        for (int i = 0; i < nums.length; i++) {
            currentSum += nums[i];

            if (prefixSumIndex
                    .containsKey(currentSum - k)) {
                return i;
            }

            prefixSumIndex.putIfAbsent(currentSum, i);
        }

        return -1;
    }
}`,
expl:`Префиксная сумма + HashMap (сумма → первый индекс). При нахождении (currentSum - k) в карте — подмассив найден, возвращаем текущий индекс. O(n).`},

{id:"pse1",t:"Произведение кроме себя (238)",p:"Prefix Sum Ext.",d:"легко",
desc:`Дан массив nums. Вернуть массив, где каждый элемент — произведение всех кроме текущего. Без деления.

Пример:
Ввод: [1, 2, 3, 4]
Вывод: [24, 12, 8, 6]`,
hint:`Два прохода: слева направо (prefix product) и справа налево (suffix product).`,
code:`class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        result[0] = 1;
        for (int i = 1; i < n; i++) {
            result[i] = result[i - 1] * nums[i - 1];
        }

        int suffix = 1;
        for (int i = n - 2; i >= 0; i--) {
            suffix *= nums[i + 1];
            result[i] *= suffix;
        }

        return result;
    }
}`,
expl:`O(n) время, O(1) дополнительная память (кроме ответа). Первый проход: prefix product слева. Второй проход: suffix product справа, умножаем на prefix.`},

{id:"pse2",t:"Индекс равных сумм",p:"Prefix Sum Ext.",d:"средне",
desc:`Найти индекс, где сумма слева равна сумме справа.

Пример:
Ввод: [7, 3, 4, 5, 5]
Вывод: 2 (leftSum = 7+3 = 10, rightSum = 5+5 = 10)

Ввод: [1, 2, 3]
Вывод: -1`,
hint:`Общая сумма. На каждом шаге: rightSum = total - leftSum - nums[i].`,
code:`class Solution {
    public int pivotIndex(int[] nums) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;

        int leftSum = 0;
        for (int i = 0; i < nums.length; i++) {
            int rightSum = totalSum - leftSum - nums[i];
            if (leftSum == rightSum) return i;
            leftSum += nums[i];
        }

        return -1;
    }
}`,
expl:`O(n) один проход (после подсчёта суммы). rightSum = totalSum - leftSum - nums[i]. Когда leftSum == rightSum — нашли pivot.`},

// ===== SLIDING WINDOW =====
{id:"sw1",t:"Minimum Window Substring (76)",p:"Sliding Window",d:"сложно",
desc:`Даны строки s и t. Найти минимальную подстроку s, содержащую все символы t (включая дубликаты). Если такой подстроки нет — вернуть "".

Пример:
s = "ADOBECODEBANC", t = "ABC"
Вывод: "BANC"

s = "a", t = "a"
Вывод: "a"`,
hint:`Sliding window: расширяем правую границу пока не покроем все символы t, затем сжимаем левую для минимизации.`,
code:`class Solution {
    public String minWindow(String s, String t) {
        if (s == null || t == null
            || s.length() < t.length()) return "";

        int[] need = new int[128];
        for (char c : t.toCharArray()) need[c]++;

        int remaining = t.length();
        int left = 0;
        int bestStart = 0;
        int minLen = Integer.MAX_VALUE;

        for (int right = 0; right < s.length(); right++) {
            char rChar = s.charAt(right);
            need[rChar]--;
            if (need[rChar] >= 0) remaining--;

            while (remaining == 0) {
                int windowLen = right - left + 1;
                if (windowLen < minLen) {
                    minLen = windowLen;
                    bestStart = left;
                }
                char lChar = s.charAt(left);
                need[lChar]++;
                if (need[lChar] > 0) remaining++;
                left++;
            }
        }

        return minLen == Integer.MAX_VALUE ? ""
            : s.substring(bestStart, bestStart + minLen);
    }
}`,
expl:`O(n) время — каждый указатель проходит строку один раз. O(1) память — фиксированный массив 128. Расширяем right до покрытия, сжимаем left для минимума.`},

{id:"sw2",t:"Longest Repeating Char Replacement (424)",p:"Sliding Window",d:"средне",
desc:`Дана строка s и число k. Можно заменить до k символов. Найти длину самой длинной подстроки из одинаковых символов.

Пример:
Ввод: s = "AABABBA", k = 1
Вывод: 4 ("AABA" → "AAAA")`,
hint:`Окно, где (размер - maxFreq) ≤ k. Если замен больше k — сжимаем слева.`,
code:`class Solution {
    public int characterReplacement(String s, int k) {
        int[] freq = new int[26];
        int maxFreq = 0;
        int left = 0;
        int result = 0;

        for (int right = 0; right < s.length(); right++) {
            freq[s.charAt(right) - 'A']++;
            maxFreq = Math.max(maxFreq,
                freq[s.charAt(right) - 'A']);

            while (right - left + 1 - maxFreq > k) {
                freq[s.charAt(left) - 'A']--;
                left++;
            }

            result = Math.max(result,
                right - left + 1);
        }

        return result;
    }
}`,
expl:`O(n) время. Поддерживаем maxFreq — максимальную частоту символа в окне. Количество замен = windowSize - maxFreq. Если > k — сжимаем окно слева.`},

{id:"sw3",t:"Поиск анаграмм (438)",p:"Sliding Window",d:"средне",
desc:`Найти все стартовые индексы анаграмм строки t в строке s.

Пример:
Ввод: s = "cbaebabacd", t = "abc"
Вывод: [0, 6]

"cba" (индекс 0) и "bac" (индекс 6) — анаграммы "abc".`,
hint:`Фиксированное окно длины len(t). Частотный массив + счётчик несовпадений.`,
code:`class Solution {
    public List<Integer> findAnagrams(String s, String t) {
        List<Integer> result = new ArrayList<>();
        if (s.length() < t.length()) return result;

        int[] need = new int[128];
        for (char c : t.toCharArray()) need[c]++;

        int missing = t.length();
        int winLen = t.length();

        for (int i = 0; i < s.length(); i++) {
            char rChar = s.charAt(i);
            if (need[rChar] > 0) missing--;
            need[rChar]--;

            if (i >= winLen) {
                char lChar = s.charAt(i - winLen);
                need[lChar]++;
                if (need[lChar] > 0) missing++;
            }

            if (missing == 0) {
                result.add(i - winLen + 1);
            }
        }

        return result;
    }
}`,
expl:`Фиксированное окно размера len(t). Массив need отслеживает, сколько каждого символа ещё нужно. missing = 0 означает все символы покрыты — это анаграмма. O(n).`},

{id:"sw4",t:"Возрастающая подпоследовательность",p:"Sliding Window",d:"легко",
desc:`Найти длину самого длинного непрерывного строго возрастающего подмассива.

Пример:
Ввод: [1, 8, 7, 15, 21, 22, 1, 7, 2]
Вывод: 4 (подмассив [7, 15, 21, 22])`,
hint:`Один проход: увеличиваем счётчик если текущий > предыдущего, иначе сбрасываем.`,
code:`class Solution {
    public int longestIncreasing(int[] arr) {
        if (arr.length == 0) return 0;

        int currLength = 1;
        int maxLength = 1;

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > arr[i - 1]) {
                currLength++;
                maxLength = Math.max(maxLength,
                    currLength);
            } else {
                currLength = 1;
            }
        }

        return maxLength;
    }
}`,
expl:`Один проход O(n). Если текущий элемент > предыдущего — увеличиваем длину. Иначе — сбрасываем до 1. Запоминаем максимум.`},

{id:"sw5",t:"Наглый подставной отчет",p:"Sliding Window",d:"средне",
desc:`Дан бинарный массив. Можно заменить до k нулей на единицы. Найти максимальную длину подмассива из единиц.

Пример:
Ввод: [1, 0, 1, 1, 0, 1, 1, 0], k = 2
Вывод: 7`,
hint:`Скользящее окно. Считаем нули внутри. Когда нулей > k — сжимаем слева.`,
code:`class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0;
        int zerosCount = 0;
        int result = 0;

        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) zerosCount++;

            while (zerosCount > k) {
                if (nums[left] == 0) zerosCount--;
                left++;
            }

            result = Math.max(result,
                right - left + 1);
        }

        return result;
    }
}`,
expl:`Окно с не более чем k нулями. Расширяем right, при превышении нулей — сжимаем left. O(n) время, O(1) память.`},

{id:"sw6",t:"Максимальный отрезок единиц с удалением",p:"Sliding Window",d:"средне",
desc:`Дан бинарный массив. Удалить ровно один элемент. Найти максимальную длину подмассива из единиц.

Пример:
Ввод: [1, 1, 0, 1]
Вывод: 3 (удаляем 0, получаем [1,1,1])

Ввод: [1, 1, 1]
Вывод: 2 (обязательно удаляем один элемент)`,
hint:`Отслеживаем prev (единицы до последнего нуля) и curr (единицы после). Ответ = prev + curr.`,
code:`class Solution {
    public int longestSubarray(int[] nums) {
        int prev = 0;
        int curr = 0;
        int result = 0;
        boolean hasZero = false;

        for (int num : nums) {
            if (num == 1) {
                curr++;
            } else {
                hasZero = true;
                result = Math.max(result, prev + curr);
                prev = curr;
                curr = 0;
            }
        }

        result = Math.max(result, prev + curr);

        return hasZero ? result : nums.length - 1;
    }
}`,
expl:`Два счётчика: prev (единицы до последнего нуля) и curr (единицы после). При нуле: ответ = prev + curr, сдвигаем prev = curr. Если нулей нет — ответ = n-1 (обязательно удаляем один). O(n).`},

{id:"sw7",t:"Подставной отчет",p:"Sliding Window",d:"средне",
desc:`Дан бинарный массив. Можно перевернуть ОДИН ноль в единицу. Найти максимальную длину подмассива из единиц.

Пример:
Ввод: [1, 1, 0, 1, 1, 1, 1, 0, 1]
Вывод: 7 (переворачиваем ноль на позиции 2)`,
hint:`Отслеживаем count единиц до нуля и после. Ответ = prev + 1 + count.`,
code:`class Solution {
    public int maxOnesWithFlip(int[] nums) {
        int prev = 0;
        int count = 0;
        int maxCount = 0;

        for (int num : nums) {
            if (num == 1) {
                count++;
            } else {
                maxCount = Math.max(maxCount,
                    prev + 1 + count);
                prev = count;
                count = 0;
            }
        }

        maxCount = Math.max(maxCount, prev + 1 + count);

        return Math.min(maxCount, nums.length);
    }
}`,
expl:`prev — единицы перед последним нулём, count — единицы после. При нуле: prev + 1 + count (1 — перевёрнутый ноль). Ограничиваем длиной массива. O(n).`},

{id:"sw8",t:"Подстроки с полным алфавитом",p:"Sliding Window",d:"средне",
desc:`Подсчитать количество подстрок строки s, содержащих все уникальные символы s.

Пример:
Ввод: "abca"
Вывод: 3 (подстроки: "abca", "bca", "abc" — нет, "abca", "abca"[0..3], "bca"[1..3])`,
hint:`Скользящее окно. Расширяем пока не покроем все уникальные символы. Когда покрыли — все расширения вправо тоже валидны.`,
code:`class Solution {
    public int countComplete(String s) {
        int target = (int) s.chars().distinct().count();

        int[] freq = new int[128];
        int uniqueInWindow = 0;
        int left = 0;
        int count = 0;

        for (int right = 0; right < s.length(); right++) {
            char rc = s.charAt(right);
            freq[rc]++;
            if (freq[rc] == 1) uniqueInWindow++;

            while (uniqueInWindow == target) {
                count += s.length() - right;
                char lc = s.charAt(left);
                freq[lc]--;
                if (freq[lc] == 0) uniqueInWindow--;
                left++;
            }
        }

        return count;
    }
}`,
expl:`Когда окно содержит все уникальные символы, все расширения вправо (s.length() - right) тоже валидны. Сжимаем left и считаем. O(n).`},

{id:"sw9",t:"Поиск мутирующего вируса",p:"Sliding Window",d:"средне",
desc:`Проверить, содержит ли строка gene какую-либо перестановку строки virus.

Пример:
Ввод: gene = "cdeebba", virus = "abb"
Вывод: true ("bba" — перестановка "abb")`,
hint:`Фиксированное окно длиной virus + частотный массив + счётчик несовпадений (аналог поиска анаграмм).`,
code:`class Solution {
    public boolean containsMutation(String gene,
                                    String virus) {
        if (gene.length() < virus.length()) return false;

        int[] need = new int[26];
        for (char c : virus.toCharArray())
            need[c - 'a']++;

        int missing = virus.length();
        int winLen = virus.length();

        for (int i = 0; i < gene.length(); i++) {
            int rc = gene.charAt(i) - 'a';
            if (need[rc] > 0) missing--;
            need[rc]--;

            if (i >= winLen) {
                int lc = gene.charAt(i - winLen) - 'a';
                need[lc]++;
                if (need[lc] > 0) missing++;
            }

            if (missing == 0) return true;
        }

        return false;
    }
}`,
expl:`Та же техника, что и поиск анаграмм, но возвращаем boolean. Фиксированное окно, частотный массив, счётчик missing. O(n).`},

{id:"sw10",t:"Инвестор в стране дураков",p:"Sliding Window",d:"средне",
desc:`Скользящее окно произведения k элементов. Корректно обрабатывать нули.

Пример:
Ввод: [-2, 0, 1, 8, -9, 0, 1, 2, 3, 0], k = 3
Вывод: [0, 0, -72, 0, 0, 0, 6, 0]`,
hint:`Поддерживать произведение ненулевых и счётчик нулей отдельно. При нулях — произведение = 0.`,
code:`class Solution {
    public int[] slidingProduct(int[] arr, int k) {
        int n = arr.length;
        int[] result = new int[n - k + 1];
        int zeroCount = 0;
        long prod = 1;

        for (int i = 0; i < k; i++) {
            if (arr[i] == 0) zeroCount++;
            else prod *= arr[i];
        }

        result[0] = zeroCount > 0 ? 0 : (int) prod;

        for (int i = k; i < n; i++) {
            int outgoing = arr[i - k];
            int incoming = arr[i];

            if (outgoing == 0) zeroCount--;
            else prod /= outgoing;

            if (incoming == 0) zeroCount++;
            else prod *= incoming;

            result[i - k + 1] =
                zeroCount > 0 ? 0 : (int) prod;
        }

        return result;
    }
}`,
expl:`O(n). Отслеживаем нули отдельно (zeroCount). Для ненулевых поддерживаем произведение, делим/умножаем при сдвиге окна. Если есть нули — результат = 0.`},

// ===== STACK =====
{id:"st1",t:"Valid Parentheses (20)",p:"Stack",d:"легко",
desc:`Дана строка содержащая только скобки: ( ) { } [ ]
Определить, является ли строка допустимой.

Допустимые пары: () [] {}

Примеры:
"()" → true
"()[]{}" → true
"([{}])" → true
"(]" → false
"([)]" → false`,
hint:`Стек (ArrayDeque). Открывающую кладём, при закрывающей — сверяем с вершиной стека.`,
code:`class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            }
            else if (stack.isEmpty()
                || !isMatchingPair(stack.pop(), c)) {
                return false;
            }
        }

        return stack.isEmpty();
    }

    private boolean isMatchingPair(char open, char close) {
        return (open == '(' && close == ')')
            || (open == '{' && close == '}')
            || (open == '[' && close == ']');
    }
}`,
expl:`O(n) время, O(n) память в худшем случае (все открывающие). Стек хранит незакрытые скобки. При закрывающей — проверяем пару с вершиной.`},

{id:"st2",t:"Прогноз потеплений (739)",p:"Stack",d:"средне",
desc:`Дан массив температур. Для каждого дня найти, через сколько дней будет теплее.

Пример:
Ввод: [5, 6, 9, 7, 5, -1, 8, 11, 2]
Вывод: [1, 1, 5, 3, 2, 1, 1, 0, 0]`,
hint:`Монотонный стек с индексами. При текущем > вершины — извлекаем и записываем разницу индексов.`,
code:`class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] result = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty()
                && temperatures[i]
                    > temperatures[stack.peek()]) {
                int idx = stack.pop();
                result[idx] = i - idx;
            }
            stack.push(i);
        }

        return result;
    }
}`,
expl:`Монотонный убывающий стек хранит индексы. Каждый индекс push/pop ровно один раз → O(n). При нахождении более тёплого дня записываем разницу.`},

{id:"st3",t:"RPN-калькулятор (150)",p:"Stack",d:"средне",
desc:`Вычислить выражение в обратной польской нотации (RPN).

Пример:
Ввод: "3 4 + 2 * 1 +"
Вычисление: (3+4)=7, 7*2=14, 14+1=15
Вывод: 15

Ввод: "4 13 5 / +"
Вычисление: 13/5=2, 4+2=6
Вывод: 6`,
hint:`Числа кладём в стек. На операторе — извлекаем два, считаем, кладём результат.`,
code:`class Solution {
    public long evalRPN(String[] tokens) {
        Deque<Long> stack = new ArrayDeque<>();

        for (String token : tokens) {
            switch (token) {
                case "+": {
                    long b = stack.pop();
                    long a = stack.pop();
                    stack.push(a + b);
                    break;
                }
                case "-": {
                    long b = stack.pop();
                    long a = stack.pop();
                    stack.push(a - b);
                    break;
                }
                case "*": {
                    long b = stack.pop();
                    long a = stack.pop();
                    stack.push(a * b);
                    break;
                }
                case "/": {
                    long b = stack.pop();
                    long a = stack.pop();
                    stack.push(a / b);
                    break;
                }
                default:
                    stack.push(Long.parseLong(token));
            }
        }

        return stack.pop();
    }
}`,
expl:`Стек для RPN-вычислений. Числа — в стек. Оператор — извлекаем два операнда, считаем, результат обратно. Порядок важен для - и /. O(n).`},

{id:"st4",t:"Простой калькулятор",p:"Stack",d:"средне",
desc:`Дан массив из чисел и операторов * и +. Вычислить с учётом приоритета (* перед +). O(1) дополнительной памяти.

Пример:
Ввод: ["2","*","3","*","1","+","2"]
Вычисление: 2*3*1=6, 6+2=8
Вывод: 8`,
hint:`Накапливаем произведение. При + добавляем к result и начинаем новое произведение.`,
code:`class Solution {
    public int calculate(String[] tokens) {
        int result = 0;
        int prevMultiply = Integer.parseInt(tokens[0]);

        for (int i = 1; i < tokens.length; i += 2) {
            String op = tokens[i];
            int num = Integer.parseInt(tokens[i + 1]);

            if (op.equals("*")) {
                prevMultiply *= num;
            } else {
                result += prevMultiply;
                prevMultiply = num;
            }
        }

        result += prevMultiply;
        return result;
    }
}`,
expl:`Выражение — сумма произведений. prevMultiply накапливает текущее произведение. При + — добавляем его к result и начинаем новое. O(n) время, O(1) память.`},

{id:"st5",t:"Разворот слов",p:"Stack",d:"легко",
desc:`Развернуть порядок слов, сохраняя пробелы на своих местах.

Пример:
Ввод: "hello world"
Вывод: "world hello"

Ввод: "  hi  there  "
Вывод: "  there  hi  "`,
hint:`Разбить на блоки (слова и пробелы). Собрать слова в deque. При реконструкции подставлять слова с конца.`,
code:`class Solution {
    public String reverseWords(String s) {
        List<String> parts = new ArrayList<>();
        Deque<String> words = new ArrayDeque<>();
        int i = 0;

        while (i < s.length()) {
            if (s.charAt(i) == ' ') {
                int start = i;
                while (i < s.length()
                    && s.charAt(i) == ' ') i++;
                parts.add(s.substring(start, i));
            } else {
                int start = i;
                while (i < s.length()
                    && s.charAt(i) != ' ') i++;
                String word = s.substring(start, i);
                parts.add(word);
                words.addFirst(word);
            }
        }

        StringBuilder sb = new StringBuilder();
        for (String part : parts) {
            if (part.charAt(0) == ' ') {
                sb.append(part);
            } else {
                sb.append(words.pollFirst());
            }
        }

        return sb.toString();
    }
}`,
expl:`Разделяем строку на блоки слов и пробелов. Слова собираем в deque в обратном порядке. При реконструкции сохраняем пробельные блоки и подставляем слова из deque. O(n).`},

// ===== TREES =====
{id:"tr1",t:"Number of Islands (200)",p:"Trees / DFS",d:"средне",
desc:`Дана карта в виде двумерного массива grid:
1 — суша, 0 — вода.
Определить сколько отдельных островов на карте.
Остров — группа соединённых по вертикали/горизонтали клеток с сушей.

Пример:
grid = [[1,1,0],
        [1,0,0],
        [0,0,1]]
Вывод: 2`,
hint:`DFS flood fill: при нахождении 1 запускаем DFS, который затапливает весь остров (ставит 0).`,
code:`public class Solution {
    private static boolean inBound(int i, int j,
            List<List<Integer>> grid) {
        return i >= 0 && i < grid.size()
            && j >= 0 && j < grid.get(0).size();
    }

    private static void dfs(int i, int j,
            List<List<Integer>> grid) {
        if (!inBound(i, j, grid)
            || grid.get(i).get(j) == 0) return;

        grid.get(i).set(j, 0);

        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            dfs(i + d[0], j + d[1], grid);
        }
    }

    public static int numIslands(
            List<List<Integer>> grid) {
        if (grid.isEmpty()) return 0;
        int count = 0;
        for (int i = 0; i < grid.size(); i++)
            for (int j = 0; j < grid.get(0).size(); j++)
                if (grid.get(i).get(j) == 1) {
                    dfs(i, j, grid);
                    count++;
                }
        return count;
    }
}`,
expl:`DFS flood fill. При нахождении 1 — затапливаем весь остров (ставим 0), +1 к счётчику. Каждая клетка посещается один раз. O(m×n) время и память.`},

{id:"tr2",t:"Симметричное дерево (101)",p:"Trees / DFS",d:"легко",
desc:`Проверить, является ли бинарное дерево симметричным (зеркальным).

Пример:
    1
   / \\
  2   2
 / \\ / \\
3  4 4  3  → true

    1
   / \\
  2   2
   \\   \\
   3    3  → false`,
hint:`Сравниваем left.left с right.right и left.right с right.left рекурсивно.`,
code:`class Solution {
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isMirror(root.left, root.right);
    }

    private boolean isMirror(TreeNode left,
                             TreeNode right) {
        if (left == null && right == null) return true;
        if (left == null || right == null) return false;
        if (left.val != right.val) return false;

        return isMirror(left.left, right.right)
            && isMirror(left.right, right.left);
    }
}`,
expl:`Рекурсивное зеркальное сравнение: left.left ↔ right.right и left.right ↔ right.left. O(n) время, O(h) стек рекурсии.`},

{id:"tr3",t:"Правильное дерево поиска (98)",p:"Trees / DFS",d:"легко",
desc:`Проверить, является ли бинарное дерево валидным BST.

Свойство: все значения слева < текущий узел < все значения справа.

Пример:
    5
   / \\
  1   7   → true

    5
   / \\
  1   7
     / \\
    4   8  → false (4 < 5)`,
hint:`Передавать min/max границы в рекурсию. Значение должно быть строго между low и high.`,
code:`class Solution {
    public boolean isValidBST(TreeNode root) {
        return isValid(root, Long.MIN_VALUE,
                       Long.MAX_VALUE);
    }

    private boolean isValid(TreeNode node,
                            long low, long high) {
        if (node == null) return true;

        if (node.val <= low || node.val >= high) {
            return false;
        }

        return isValid(node.left, low, node.val)
            && isValid(node.right, node.val, high);
    }
}`,
expl:`Рекурсия с границами: для левого поддерева max = node.val, для правого min = node.val. Используем long для обработки граничных значений Integer. O(n).`},

{id:"tr4",t:"Поиск k-ого наименьшего (230)",p:"Trees / DFS",d:"средне",
desc:`Найти k-й наименьший элемент в BST.

Пример:
Дерево: [10, 5, 11, -2, 7], k = 3
Inorder: -2, 5, 7, 10, 11
Вывод: 7`,
hint:`Inorder-обход BST даёт отсортированную последовательность. Считаем элементы, останавливаемся на k-м.`,
code:`class Solution {
    private int count = 0;
    private int result = 0;

    public int kthSmallest(TreeNode root, int k) {
        inorder(root, k);
        return result;
    }

    private void inorder(TreeNode node, int k) {
        if (node == null) return;

        inorder(node.left, k);

        count++;
        if (count == k) {
            result = node.val;
            return;
        }

        inorder(node.right, k);
    }
}`,
expl:`Inorder-обход BST выдаёт элементы в отсортированном порядке. Считаем посещённые узлы, при count == k — нашли ответ. O(H + k) время.`},

// ===== TWO POINTERS =====
{id:"tp1",t:"Container With Most Water (11)",p:"Two Pointers",d:"средне",
desc:`Дан массив heights, heights[i] — высота линии.
Найти максимальную площадь воды между двумя линиями.
Площадь = min(heights[i], heights[j]) × (j - i)

Пример:
Ввод: [1, 8, 6, 2, 5, 4, 8, 3, 7]
Вывод: 49 (min(8,7) × (8-1) = 7 × 7 = 49)`,
hint:`Два указателя с разных концов. Сдвигаем тот, чья высота меньше — сдвиг большего точно не увеличит площадь.`,
code:`public class Solution {
    public int maxArea(int[] height) {
        int l = 0;
        int r = height.length - 1;
        int resultArea = 0;

        while (l < r) {
            int currArea =
                Math.min(height[l], height[r])
                * (r - l);
            resultArea =
                Math.max(resultArea, currArea);

            if (height[l] < height[r]) {
                l++;
            } else {
                r--;
            }
        }

        return resultArea;
    }
}`,
expl:`O(n) время, O(1) память. Два указателя с краёв. Сдвигаем меньший — сдвиг большего уменьшит ширину без возможности увеличить высоту.`},

{id:"tp2",t:"Правильный палиндром (125)",p:"Two Pointers",d:"легко",
desc:`Проверить, является ли строка палиндромом, игнорируя неалфавитные символы и регистр.

Пример:
Ввод: "A man, a plan, a canal: Panama"
Вывод: true

Ввод: "race a car"
Вывод: false`,
hint:`Два указателя с краёв. Пропускаем не-буквы/не-цифры. Сравниваем в нижнем регистре.`,
code:`class Solution {
    public boolean isPalindrome(String s) {
        int l = 0;
        int r = s.length() - 1;

        while (l < r) {
            while (l < r
                && !Character.isLetterOrDigit(
                    s.charAt(l))) l++;
            while (l < r
                && !Character.isLetterOrDigit(
                    s.charAt(r))) r--;

            if (Character.toLowerCase(s.charAt(l))
                != Character.toLowerCase(s.charAt(r))) {
                return false;
            }

            l++;
            r--;
        }

        return true;
    }
}`,
expl:`Два указателя к центру. Пропускаем пунктуацию/пробелы. Сравниваем в нижнем регистре. O(n) время, O(1) память.`},

{id:"tp3",t:"Перемещение нулей (283)",p:"Two Pointers",d:"легко",
desc:`Переместить все нули в конец массива, сохраняя порядок ненулевых. In-place.

Пример:
Ввод: [0, 1, 0, 3, 12]
Вывод: [1, 3, 12, 0, 0]`,
hint:`Указатель записи для ненулевых элементов. После — заполняем оставшиеся нулями.`,
code:`class Solution {
    public void moveZeroes(int[] nums) {
        int insert = 0;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                nums[insert] = nums[i];
                insert++;
            }
        }

        while (insert < nums.length) {
            nums[insert] = 0;
            insert++;
        }
    }
}`,
expl:`Fast/slow pointer. Быстрый проходит все элементы. Медленный (insert) — позиция записи ненулевых. После — заполняем хвост нулями. O(n).`},

{id:"tp4",t:"Сжатие пробелов",p:"Two Pointers",d:"легко",
desc:`Заменить последовательные пробелы одним. In-place на массиве символов.

Пример:
Ввод: ['a',' ',' ','b']
Вывод: ['a',' ','b']`,
hint:`Указатель записи + флаг prevSpace. Записываем пробел только если предыдущий символ не был пробелом.`,
code:`class Solution {
    public int compressSpaces(char[] arr) {
        int w = 0;
        boolean prevSpace = false;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == ' ') {
                if (!prevSpace) {
                    arr[w++] = ' ';
                    prevSpace = true;
                }
            } else {
                arr[w++] = arr[i];
                prevSpace = false;
            }
        }

        return w;
    }
}`,
expl:`Указатель записи w. Пробел записываем только при !prevSpace. Возвращаем новую длину. O(n) время, O(1) память.`},

{id:"tp5",t:"Неточный поиск",p:"Two Pointers",d:"легко",
desc:`Проверить, является ли s подпоследовательностью t (символы s встречаются в t в том же порядке).

Пример:
Ввод: s = "abc", t = "a1b2c3"
Вывод: true

Ввод: s = "axc", t = "ahbgdc"
Вывод: false`,
hint:`Два указателя. Продвигаем указатель s при совпадении символов.`,
code:`class Solution {
    public boolean isSubsequence(String s, String t) {
        int p1 = 0, p2 = 0;

        while (p1 < s.length() && p2 < t.length()) {
            if (s.charAt(p1) == t.charAt(p2)) {
                p1++;
            }
            p2++;
        }

        return p1 == s.length();
    }
}`,
expl:`Два указателя: p1 по s, p2 по t. При совпадении продвигаем оба, иначе только p2. Если p1 дошёл до конца — s является подпоследовательностью t. O(|t|).`},

{id:"tp6",t:"Сумма в сортированном массиве",p:"Two Pointers",d:"легко",
desc:`Найти два элемента в отсортированном массиве, дающих в сумме target. Вернуть их индексы (1-based). O(1) доп. памяти.

Пример:
Ввод: [-2, 1, 6, 9, 12], target = 18
Вывод: [3, 5] (6 + 12 = 18)`,
hint:`Два указателя с краёв. Если сумма < target — двигаем левый. Если > — правый.`,
code:`class Solution {
    public int[] twoSum(int[] nums, int target) {
        int l = 0;
        int r = nums.length - 1;

        while (l < r) {
            int currSum = nums[l] + nums[r];
            if (currSum == target) {
                return new int[]{l + 1, r + 1};
            } else if (currSum < target) {
                l++;
            } else {
                r--;
            }
        }

        return new int[]{-1, -1};
    }
}`,
expl:`Массив отсортирован → два указателя. Сумма < target → увеличиваем (l++). Сумма > target → уменьшаем (r--). O(n) время, O(1) память.`},

{id:"tp7",t:"Общие элементы массивов",p:"Two Pointers",d:"легко",
desc:`Найти общие элементы двух отсортированных массивов (с учётом дубликатов).

Пример:
Ввод: [-3,2,2,5,8,19,31], [1,2,2,2,6,19,52]
Вывод: [2, 2, 19]`,
hint:`Два указателя на отсортированных массивах. Если равны — добавляем и оба вперёд. Иначе — двигаем меньший.`,
code:`class Solution {
    public List<Integer> commonElements(int[] a, int[] b) {
        List<Integer> result = new ArrayList<>();
        int p1 = 0, p2 = 0;

        while (p1 < a.length && p2 < b.length) {
            if (a[p1] == b[p2]) {
                result.add(a[p1]);
                p1++;
                p2++;
            } else if (a[p1] < b[p2]) {
                p1++;
            } else {
                p2++;
            }
        }

        return result;
    }
}`,
expl:`Merge-подобная техника на отсортированных массивах. При совпадении — добавляем и двигаем оба указателя. Иначе — двигаем указатель на меньший элемент. O(n+m).`},

{id:"tp8",t:"Свертка в диапазоны",p:"Two Pointers",d:"средне",
desc:`Отсортировать числа и свернуть последовательные в диапазоны "x-y".

Пример:
Ввод: [1, 4, 5, 2, 3, 9, 8, 11, 0]
Вывод: "0-5,8-9,11"`,
hint:`Сортируем. Два указателя для расширения диапазона последовательных чисел.`,
code:`class Solution {
    public String toRanges(int[] nums) {
        Arrays.sort(nums);
        StringBuilder sb = new StringBuilder();

        int i = 0;
        while (i < nums.length) {
            int start = nums[i];
            while (i + 1 < nums.length
                && nums[i + 1] == nums[i] + 1) {
                i++;
            }
            int end = nums[i];

            if (sb.length() > 0) sb.append(",");
            if (start == end) {
                sb.append(start);
            } else {
                sb.append(start).append("-").append(end);
            }
            i++;
        }

        return sb.toString();
    }
}`,
expl:`Сортируем массив O(n log n). Затем группируем последовательные числа. Одиночные — как число, диапазоны — как "start-end".`},

{id:"tp9",t:"Удаление смайликов",p:"Two Pointers",d:"легко",
desc:`Удалить смайлики :-) и :-( (включая повторяющиеся скобки) из массива символов. In-place.

Пример:
Ввод: ['a',':','-',')','b']
Вывод: ['a','b']

Ввод: [':', '-', ')', ')', ')']
Вывод: [] (всё удалено, включая повторяющиеся скобки)`,
hint:`Указатель записи. Обнаруживаем паттерн :-) или :-(, пропускаем включая повторяющиеся скобки.`,
code:`class Solution {
    public int removeSmileys(char[] arr) {
        int w = 0;

        for (int i = 0; i < arr.length; ) {
            if (i + 2 < arr.length
                && arr[i] == ':'
                && arr[i + 1] == '-'
                && (arr[i + 2] == ')'
                    || arr[i + 2] == '(')) {
                char bracket = arr[i + 2];
                i += 3;
                while (i < arr.length
                    && arr[i] == bracket) {
                    i++;
                }
            } else {
                arr[w++] = arr[i++];
            }
        }

        return w;
    }
}`,
expl:`Обнаруживаем паттерн :- после чего ) или (. Пропускаем сам смайлик и все повторяющиеся скобки того же типа. Указатель записи сохраняет остальные символы. O(n).`},

{id:"tp10",t:"Кодирование повторов (RLE)",p:"Two Pointers",d:"средне",
desc:`Run-length encode массива символов. Последовательные одинаковые символы заменить на символ + количество (если > 1).

Пример:
Ввод: ['x','x','y','z','z','z']
Вывод: ['x','2','y','z','3']

Ввод: ['a','a','a','a','a','a','a','a','a','a','b','b']
Вывод: ['a','1','0','b','2']`,
hint:`Считаем длину серии одинаковых. Записываем символ + цифры количества (для многозначных чисел).`,
code:`class Solution {
    public int encode(char[] arr) {
        int w = 0;
        int i = 0;

        while (i < arr.length) {
            char c = arr[i];
            int j = i;
            while (j < arr.length && arr[j] == c) {
                j++;
            }
            int count = j - i;

            arr[w++] = c;
            if (count > 1) {
                String countStr =
                    String.valueOf(count);
                for (char d : countStr.toCharArray()) {
                    arr[w++] = d;
                }
            }

            i = j;
        }

        return w;
    }
}`,
expl:`Группируем последовательные одинаковые символы. Записываем символ, затем цифры количества (если > 1). Для многозначных чисел записываем каждую цифру отдельно. O(n).`},

{id:"tp11",t:"Почти палиндром (680)",p:"Two Pointers",d:"средне",
desc:`Можно ли удалить не более одного символа, чтобы строка стала палиндромом?

Пример:
Ввод: "abca"
Вывод: true (удалить 'c' → "aba" или удалить 'b' → "aca")

Ввод: "abc"
Вывод: false`,
hint:`Два указателя. При первом несовпадении — пробуем пропустить левый или правый символ.`,
code:`class Solution {
    public boolean validPalindrome(String s) {
        int l = 0, r = s.length() - 1;

        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return isPalin(s, l + 1, r)
                    || isPalin(s, l, r - 1);
            }
            l++;
            r--;
        }

        return true;
    }

    private boolean isPalin(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r))
                return false;
            l++;
            r--;
        }
        return true;
    }
}`,
expl:`Два указателя с краёв. При первом несовпадении проверяем оба варианта: пропустить левый или правый. Если хотя бы один даёт палиндром — true. O(n).`},

{id:"tp12",t:"Сортировка квадратов (977)",p:"Two Pointers",d:"легко",
desc:`Дан отсортированный массив. Вернуть массив квадратов в отсортированном порядке.

Пример:
Ввод: [-3, -2, 0, 1, 3, 5]
Вывод: [0, 1, 4, 9, 9, 25]`,
hint:`Два указателя с краёв. Сравниваем абсолютные значения. Заполняем результат с конца.`,
code:`class Solution {
    public int[] sortedSquares(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        int l = 0, r = n - 1;
        int w = n - 1;

        while (l <= r) {
            int leftSq = nums[l] * nums[l];
            int rightSq = nums[r] * nums[r];

            if (leftSq > rightSq) {
                result[w--] = leftSq;
                l++;
            } else {
                result[w--] = rightSq;
                r--;
            }
        }

        return result;
    }
}`,
expl:`Наибольшие квадраты — на краях массива (отрицательные или положительные). Два указателя сравнивают абсолютные значения, заполняем результат справа налево. O(n).`},

// ===== UNION-FIND =====
{id:"uf1",t:"Объединение графиков",p:"Union-Find",d:"средне",
desc:`Дан массив графиков, где каждый график — список пар [время, значение], отсортированный по времени. Объединить все графики в один: [время, сумма значений].

Пример:
Ввод: [[[1,2],[3,1]], [[2,3],[4,2]]]
Вывод: [[1,2],[2,5],[3,4],[4,3]]

Объяснение: t=1: 2, t=2: 2+3=5, t=3: 1+3=4, t=4: 1+2=3`,
hint:`Min-heap для событий из всех графиков. Обрабатываем все события с одинаковым временем вместе.`,
code:`public class Solution {
    public List<List<Integer>> merge(
            List<List<List<Integer>>> graphics) {
        int k = graphics.size();
        int[] currentValues = new int[k];
        long currentSum = 0;

        PriorityQueue<int[]> heap =
            new PriorityQueue<>(
                Comparator.comparingInt(a -> a[0]));

        for (int i = 0; i < k; i++) {
            var g = graphics.get(i);
            if (g != null && !g.isEmpty())
                heap.offer(new int[]{
                    g.get(0).get(0), i, 0});
        }

        List<List<Integer>> result = new ArrayList<>();

        while (!heap.isEmpty()) {
            int curTime = heap.peek()[0];

            while (!heap.isEmpty()
                   && heap.peek()[0] == curTime) {
                int[] ev = heap.poll();
                int gi = ev[1], pi = ev[2];
                var g = graphics.get(gi);
                int newVal = g.get(pi).get(1);
                int oldVal = currentValues[gi];

                if (newVal != oldVal) {
                    currentValues[gi] = newVal;
                    currentSum +=
                        (long) newVal - oldVal;
                }

                if (pi + 1 < g.size())
                    heap.offer(new int[]{
                        g.get(pi + 1).get(0), gi,
                        pi + 1});
            }

            result.add(Arrays.asList(
                curTime, (int) currentSum));
        }
        return result;
    }
}`,
expl:`Min-heap обрабатывает события по времени. Все события одного момента — за раз. Поддерживаем текущие значения каждого графика и их сумму. O(N log k) где N — суммарное число точек.`},

{id:"uf2",t:"Объединение нескольких графиков",p:"Union-Find",d:"средне",
desc:`Вариант задачи объединения графиков. Дан массив графиков [время, значение]. Объединить в один суммарный.

Пример:
Ввод: [[[0,1],[2,3]], [[1,2],[3,4]]]
Вывод: [[0,1],[1,3],[2,5],[3,5]]`,
hint:`Тот же подход с min-heap: обрабатываем события хронологически.`,
code:`public class Solution {
    public List<int[]> mergeCharts(
            List<List<int[]>> charts) {
        int k = charts.size();
        int[] vals = new int[k];
        long sum = 0;

        PriorityQueue<int[]> pq =
            new PriorityQueue<>(
                Comparator.comparingInt(a -> a[0]));

        for (int i = 0; i < k; i++) {
            if (!charts.get(i).isEmpty()) {
                int[] first = charts.get(i).get(0);
                pq.offer(new int[]{first[0], i, 0});
            }
        }

        List<int[]> result = new ArrayList<>();

        while (!pq.isEmpty()) {
            int time = pq.peek()[0];

            while (!pq.isEmpty()
                   && pq.peek()[0] == time) {
                int[] ev = pq.poll();
                int ci = ev[1], pi = ev[2];
                var chart = charts.get(ci);
                int newVal = chart.get(pi)[1];

                sum += (long) newVal - vals[ci];
                vals[ci] = newVal;

                if (pi + 1 < chart.size()) {
                    int[] next = chart.get(pi + 1);
                    pq.offer(new int[]{
                        next[0], ci, pi + 1});
                }
            }

            result.add(new int[]{time, (int) sum});
        }

        return result;
    }
}`,
expl:`Идентичный подход: min-heap обрабатывает события хронологически. Поддерживаем текущую сумму, обновляя при каждом событии. O(N log k).`},

// ===== STRINGS =====
{id:"sp1",t:"Общий префикс (14)",p:"Strings Prefix",d:"легко",
desc:`Найти самый длинный общий префикс массива строк.

Пример:
Ввод: ["present", "predicate", "prepare"]
Вывод: "pre"

Ввод: ["flower", "flow", "flight"]
Вывод: "fl"

Ввод: ["dog", "racecar", "car"]
Вывод: ""`,
hint:`Вертикальное сканирование: сравниваем символ по символу по всем строкам. Останавливаемся при первом несовпадении.`,
code:`class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";

        for (int i = 0; i < strs[0].length(); i++) {
            char c = strs[0].charAt(i);

            for (int j = 1; j < strs.length; j++) {
                if (i >= strs[j].length()
                    || strs[j].charAt(i) != c) {
                    return strs[0].substring(0, i);
                }
            }
        }

        return strs[0];
    }
}`,
expl:`Вертикальное сканирование: внешний цикл по позиции символа, внутренний — по всем строкам. Останавливаемся при первом несовпадении или конце строки. O(S) где S — суммарная длина строк.`},

// ===== SLIDING WINDOW + DEQUE =====
{id:"swd1",t:"Окно с ограниченным размахом",p:"Window + Deque",d:"сложно",
desc:`Найти самый длинный подмассив, в котором max - min ≤ limit.

Пример:
Ввод: [1, 2, 3, 5, 8], limit = 1
Вывод: 2 (подмассив [1,2] или [2,3])

Ввод: [8, 2, 4, 7], limit = 4
Вывод: 2`,
hint:`Два монотонных дека: maxD (убывающий) для максимума, minD (возрастающий) для минимума. Скользящее окно.`,
code:`class Solution {
    public int longestSubarray(int[] nums, int limit) {
        Deque<Integer> maxD = new ArrayDeque<>();
        Deque<Integer> minD = new ArrayDeque<>();
        int left = 0;
        int result = 0;

        for (int right = 0; right < nums.length; right++){
            while (!maxD.isEmpty()
                && nums[maxD.peekLast()] <= nums[right])
                maxD.pollLast();
            maxD.addLast(right);

            while (!minD.isEmpty()
                && nums[minD.peekLast()] >= nums[right])
                minD.pollLast();
            minD.addLast(right);

            while (nums[maxD.peekFirst()]
                   - nums[minD.peekFirst()] > limit) {
                left++;
                if (maxD.peekFirst() < left)
                    maxD.pollFirst();
                if (minD.peekFirst() < left)
                    minD.pollFirst();
            }

            result = Math.max(result,
                right - left + 1);
        }

        return result;
    }
}`,
expl:`Два монотонных дека: maxD хранит индексы в убывающем порядке значений (голова = максимум окна), minD — в возрастающем (голова = минимум). Когда max - min > limit, сжимаем окно слева. Каждый элемент push/pop один раз → O(n).`},

// ===== DYNAMIC PROGRAMMING =====
{id:"dp1",t:"Longest Palindromic Substring (5)",p:"Dynamic Prog.",d:"средне",
desc:`Дана строка s. Найти самую длинную подстроку-палиндром.

Пример:
Ввод: s = "babad"
Вывод: "bab" (или "aba")

Ввод: s = "cbbd"
Вывод: "bb"`,
hint:`Expand around center: для каждого символа (и пары) расширяемся влево-вправо пока символы совпадают.`,
code:`class Solution {
    public String longestPalindrome(String s) {
        int start = 0, maxLen = 0;

        for (int i = 0; i < s.length(); i++) {
            int len1 = expand(s, i, i);
            int len2 = expand(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > maxLen) {
                maxLen = len;
                start = i - (len - 1) / 2;
            }
        }

        return s.substring(start, start + maxLen);
    }

    private int expand(String s, int l, int r) {
        while (l >= 0 && r < s.length()
               && s.charAt(l) == s.charAt(r)) {
            l--;
            r++;
        }
        return r - l - 1;
    }
}`,
expl:`O(n²) время, O(1) память. Для каждого центра (n для нечётных, n-1 для чётных) расширяемся пока символы совпадают. Запоминаем лучший результат.`},

// ===== STACK (продолжение) =====
{id:"st6",t:"Скобочная грамматика",p:"Stack",d:"средне",
desc:`(term)[n] — повторить term n раз. Вложенность возможна.

Пример:
Ввод: "a(b(c)[2])[3]"
Вывод: "abccbccbcc"

Ввод: "(ab)[2]"
Вывод: "abab"

Ввод: "x(y)[3]z"
Вывод: "xyyyz"`,
hint:`Два стека: один для строк (StringBuilder), один для чисел. При ( — push текущую строку и начать новую. При ] — pop и повторить.`,
code:`class Solution {
    public String decode(String s) {
        Deque<StringBuilder> strStack = new ArrayDeque<>();
        Deque<Integer> numStack = new ArrayDeque<>();
        StringBuilder current = new StringBuilder();
        int i = 0;

        while (i < s.length()) {
            char c = s.charAt(i);

            if (c == '(') {
                strStack.push(current);
                current = new StringBuilder();
                i++;
            } else if (c == ')') {
                i++;
                i++; // skip '['
                int num = 0;
                while (i < s.length()
                    && Character.isDigit(s.charAt(i))) {
                    num = num * 10
                        + (s.charAt(i) - '0');
                    i++;
                }
                i++; // skip ']'
                numStack.push(num);
                StringBuilder prev = strStack.pop();
                int repeat = numStack.pop();
                String repeated = current.toString();
                for (int r = 0; r < repeat; r++) {
                    prev.append(repeated);
                }
                current = prev;
            } else {
                current.append(c);
                i++;
            }
        }

        return current.toString();
    }
}`,
expl:`Стек строк хранит накопленные prefix-ы. При открывающей скобке — push текущего контекста и начинаем новую строку. При закрытии ] достаём prefix и повторяем текущую строку n раз. O(n × суммарная длина результата).`},

// ===== TWO POINTERS (продолжение) =====
{id:"tp13",t:"Ближайший митинг",p:"Two Pointers",d:"средне",
desc:`Два человека имеют списки свободных интервалов (отсортированных). Найти первый общий слот длительностью >= duration.

Пример:
Ввод:
  person1 = [[9,12],[14,16],[18,21]]
  person2 = [[10,13],[15,17],[19,22]]
  duration = 2
Вывод: [10,12] (пересечение [10,12] длиной 2)

Ввод:
  person1 = [[1,5],[8,10]]
  person2 = [[3,7],[9,12]]
  duration = 2
Вывод: [3,5]`,
hint:`Two pointers по двум спискам интервалов. Ищем пересечение >= duration. Двигаем указатель, чей интервал заканчивается раньше.`,
code:`class Solution {
    public int[] meetingTime(int[][] a, int[][] b,
                             int duration) {
        int i = 0, j = 0;

        while (i < a.length && j < b.length) {
            int start = Math.max(a[i][0], b[j][0]);
            int end = Math.min(a[i][1], b[j][1]);

            if (end - start >= duration) {
                return new int[]{start,
                    start + duration};
            }

            if (a[i][1] < b[j][1]) {
                i++;
            } else {
                j++;
            }
        }

        return new int[]{};
    }
}`,
expl:`Считаем пересечение: min(end1,end2) - max(start1,start2). Если >= duration — нашли слот. Двигаем указатель, чей интервал заканчивается раньше. O(n+m).`},

// ===== PREFIX SUM EXT. (продолжение) =====
{id:"pse3",t:"Общий префикс без учёта кратности",p:"Prefix Sum Ext.",d:"средне",
desc:`Даны два массива A и B одинаковой длины n, содержащие числа от 1 до n.
Для каждого i найти количество уникальных чисел, которые встречались хотя бы раз и в A[0..i], и в B[0..i].

Пример:
Ввод: A = [1,3,2,4], B = [3,1,2,4]
Вывод: [0,2,3,4]
Объяснение:
  i=0: A={1}, B={3} → общих 0
  i=1: A={1,3}, B={3,1} → общих 2
  i=2: A={1,3,2}, B={3,1,2} → общих 3
  i=3: A={1,3,2,4}, B={3,1,2,4} → общих 4`,
hint:`Массив count[1..n]. При встрече числа в A или B увеличиваем count. Когда count == 2 — число есть в обоих.`,
code:`class Solution {
    public int[] findCommonPrefix(int[] A, int[] B) {
        int n = A.length;
        int[] count = new int[n + 1];
        int[] result = new int[n];
        int common = 0;

        for (int i = 0; i < n; i++) {
            count[A[i]]++;
            if (count[A[i]] == 2) common++;

            count[B[i]]++;
            if (count[B[i]] == 2) common++;

            result[i] = common;
        }

        return result;
    }
}`,
expl:`Массив count[v] хранит, сколько раз число v встречено (в A, в B, или в обоих). Когда count == 2 — число есть в обоих массивах. Не учитываем кратность (число входит максимум 1 раз в каждый массив). O(n).`},

{id:"pse4",t:"Общий префикс с учётом кратности",p:"Prefix Sum Ext.",d:"средне",
desc:`Даны два массива A и B одинаковой длины n. Для каждого i найти количество общих чисел в A[0..i] и B[0..i] с учётом кратности (если число встречается 2 раза в A и 3 раза в B, общих — 2).

Пример:
Ввод: A = [1,1,2,2], B = [1,2,1,2]
Вывод: [1,1,2,4]
Объяснение:
  i=0: A={1}, B={1} → min(1,1) = 1
  i=1: A={1,1}, B={1,2} → min(2,1)+min(0,1) = 1
  i=2: A={1,1,2}, B={1,2,1} → min(2,2)+min(1,1) = 3
  i=3: A={1,1,2,2}, B={1,2,1,2} → min(2,2)+min(2,2) = 4`,
hint:`Два массива частот countA[], countB[]. При обновлении числа v проверяем: если min увеличился — common++.`,
code:`class Solution {
    public int[] commonPrefixWithMultiplicity(
            int[] A, int[] B) {
        int n = A.length;
        Map<Integer, Integer> countA = new HashMap<>();
        Map<Integer, Integer> countB = new HashMap<>();
        int[] result = new int[n];
        int common = 0;

        for (int i = 0; i < n; i++) {
            int ca = countA.merge(A[i], 1, Integer::sum);
            int cb = countB.getOrDefault(A[i], 0);
            if (ca <= cb) common++;

            int cb2 = countB.merge(B[i], 1, Integer::sum);
            int ca2 = countA.getOrDefault(B[i], 0);
            if (cb2 <= ca2) common++;

            result[i] = common;
        }

        return result;
    }
}`,
expl:`При добавлении A[i]: если countA[v] <= countB[v] (т.е. после инкремента новый min увеличился), то common++. Аналогично для B[i]. O(n) при HashMap.`},

{id:"pse5",t:"Prefix Common Array (2657)",p:"Prefix Sum Ext.",d:"средне",
desc:`Даны две перестановки A и B длины n (числа от 1 до n). Найти массив C, где C[i] = количество чисел, которые присутствуют и в A[0..i], и в B[0..i].

LeetCode 2657.

Пример:
Ввод: A = [1,3,2,4], B = [3,1,2,4]
Вывод: [0,2,3,4]

Ввод: A = [2,3,1], B = [3,1,2]
Вывод: [0,1,3]`,
hint:`Массив freq[1..n]. При встрече числа в A или B увеличиваем freq. Когда freq == 2 — число встретилось в обоих.`,
code:`class Solution {
    public int[] findThePrefixCommonArray(
            int[] A, int[] B) {
        int n = A.length;
        int[] freq = new int[n + 1];
        int[] result = new int[n];
        int common = 0;

        for (int i = 0; i < n; i++) {
            freq[A[i]]++;
            if (freq[A[i]] == 2) common++;

            freq[B[i]]++;
            if (freq[B[i]] == 2) common++;

            result[i] = common;
        }

        return result;
    }
}`,
expl:`Так как A и B — перестановки, каждое число встречается ровно по 1 разу в каждом. freq[v] считает сколько раз v встретилось суммарно. Когда freq == 2 — число есть и в A[0..i], и в B[0..i]. O(n) время, O(n) память.`},

{id:"tp14",t:"Сжатие значений счётчика",p:"Two Pointers",d:"легко",
desc:`Дан отсортированный массив. Заменить каждый элемент его рангом (1-based). Одинаковые значения получают одинаковый ранг.

Пример:
Ввод: [10, 20, 20, 30]
Вывод: [1, 2, 2, 3]

Ввод: [5, 5, 5]
Вывод: [1, 1, 1]`,
hint:`Отсортировать уникальные значения, назначить ранги. Или пройти один раз, увеличивая ранг при смене значения.`,
code:`class Solution {
    public int[] compress(int[] arr) {
        int n = arr.length;
        int[] sorted = arr.clone();
        Arrays.sort(sorted);

        Map<Integer, Integer> rank = new HashMap<>();
        int r = 1;
        for (int i = 0; i < n; i++) {
            if (!rank.containsKey(sorted[i])) {
                rank.put(sorted[i], r++);
            }
        }

        int[] result = new int[n];
        for (int i = 0; i < n; i++) {
            result[i] = rank.get(arr[i]);
        }

        return result;
    }
}`,
expl:`Сортируем копию массива. Назначаем ранги уникальным значениям (1, 2, 3, ...). Затем заменяем каждый элемент его рангом. O(n log n).`},

// ===== MATH / SIMULATION (продолжение) =====
{id:"ms5",t:"Скалярное произведение векторов",p:"Math / Simulation",d:"легко",
desc:`Даны два вектора одинаковой длины. Вычислить скалярное произведение: a[0]*b[0] + a[1]*b[1] + ... + a[n-1]*b[n-1].

Пример:
Ввод: a = [1, 2, 3], b = [4, 5, 6]
Вывод: 32 (1*4 + 2*5 + 3*6 = 4 + 10 + 18)

Ввод: a = [0, 1], b = [1, 0]
Вывод: 0`,
hint:`Один проход: суммируем произведения соответствующих элементов.`,
code:`class Solution {
    public long dotProduct(int[] a, int[] b) {
        long result = 0;

        for (int i = 0; i < a.length; i++) {
            result += (long) a[i] * b[i];
        }

        return result;
    }
}`,
expl:`Линейный проход: складываем a[i] * b[i]. Используем long для предотвращения переполнения. O(n) время, O(1) память.`},

// ===== SLIDING WINDOW (продолжение) =====
{id:"sw11",t:"Подсчёт пар индексов",p:"Sliding Window",d:"средне",
desc:`Дан массив nums и целое число k. Посчитать количество пар (i, j), где i < j и nums[i] + nums[j] >= k.

Пример:
Ввод: nums = [1, 3, 5, 2, 4], k = 6
Вывод: 4 (пары: (1,5), (3,5), (3,4), (5,4) по значениям → (1,2), (0,2), (0,4), (2,4) по индексам)

Ввод: nums = [1, 1, 1], k = 3
Вывод: 0`,
hint:`Сортируем массив. Два указателя с краёв: если a[l]+a[r] >= k, то все пары (l..r-1, r) подходят → добавляем (r-l), r--. Иначе l++.`,
code:`class Solution {
    public long countPairs(int[] nums, int k) {
        Arrays.sort(nums);
        long count = 0;
        int l = 0, r = nums.length - 1;

        while (l < r) {
            if (nums[l] + nums[r] >= k) {
                count += (r - l);
                r--;
            } else {
                l++;
            }
        }

        return count;
    }
}`,
expl:`Сортируем массив. Если nums[l] + nums[r] >= k, то все элементы между l и r в паре с r тоже подойдут (массив отсортирован) → count += (r-l). O(n log n).`},

{id:"tp15",t:"Поиск K ближайших элементов",p:"Two Pointers",d:"сложно",
desc:`Дан отсортированный массив arr и два числа k и x. Найти k ближайших к x элементов. Вернуть в отсортированном порядке.

Пример:
Ввод: arr = [1,2,3,4,5], k = 4, x = 3
Вывод: [1,2,3,4]

Ввод: arr = [1,2,3,4,5], k = 4, x = -1
Вывод: [1,2,3,4]`,
hint:`Бинарный поиск начала окна размером k. Сравниваем расстояния x - arr[mid] и arr[mid+k] - x.`,
code:`class Solution {
    public List<Integer> findClosestElements(
            int[] arr, int k, int x) {
        int left = 0;
        int right = arr.length - k;

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (x - arr[mid] > arr[mid + k] - x) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        List<Integer> result = new ArrayList<>();
        for (int i = left; i < left + k; i++) {
            result.add(arr[i]);
        }

        return result;
    }
}`,
expl:`Бинарный поиск левой границы окна размером k. Если расстояние до arr[mid] больше, чем до arr[mid+k], сдвигаем окно вправо. O(log(n-k) + k).`},

{id:"tp16",t:"К ближайших чисел",p:"Two Pointers",d:"средне",
desc:`Дан отсортированный массив и число target. Найти k ближайших к target чисел. Если расстояния равны — меньший элемент предпочтительнее.

Пример:
Ввод: arr = [1, 3, 5, 7, 9], target = 6, k = 3
Вывод: [5, 7, 3] (расстояния: 1, 1, 3 — ближайшие)

Ввод: arr = [2, 4, 5, 6, 9], target = 4, k = 2
Вывод: [4, 5]`,
hint:`Бинарный поиск ближайшего, затем два указателя расширяются влево и вправо.`,
code:`class Solution {
    public List<Integer> kClosest(int[] arr,
                                  int target, int k) {
        int pos = binarySearch(arr, target);
        int left = pos - 1;
        int right = pos;
        List<Integer> result = new ArrayList<>();

        while (result.size() < k) {
            if (left < 0) {
                result.add(arr[right++]);
            } else if (right >= arr.length) {
                result.add(arr[left--]);
            } else if (Math.abs(arr[left] - target)
                    <= Math.abs(arr[right] - target)) {
                result.add(arr[left--]);
            } else {
                result.add(arr[right++]);
            }
        }

        return result;
    }

    private int binarySearch(int[] arr, int target) {
        int lo = 0, hi = arr.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}`,
expl:`Бинарный поиск позиции ближайшей к target. Два указателя расходятся от этой позиции: выбираем ближайший из arr[left] и arr[right]. O(log n + k).`},

{id:"tp17",t:"Минимальная разность",p:"Two Pointers",d:"легко",
desc:`Даны два отсортированных массива. Найти минимальную абсолютную разность между элементами из разных массивов.

Пример:
Ввод: a = [1, 3, 15, 25], b = [2, 6, 18, 28]
Вывод: 1 (|1-2| = 1)

Ввод: a = [1, 10, 20], b = [5, 15, 25]
Вывод: 4 (|1-5|=4)`,
hint:`Два указателя. Считаем |a[i]-b[j]|. Двигаем указатель на меньший элемент.`,
code:`class Solution {
    public int minDifference(int[] a, int[] b) {
        int i = 0, j = 0;
        int minDiff = Integer.MAX_VALUE;

        while (i < a.length && j < b.length) {
            int diff = Math.abs(a[i] - b[j]);
            minDiff = Math.min(minDiff, diff);

            if (a[i] < b[j]) {
                i++;
            } else {
                j++;
            }
        }

        return minDiff;
    }
}`,
expl:`Два указателя на отсортированных массивах. Двигаем указатель на меньший элемент — это приближает значения друг к другу. O(n+m) время, O(1) память.`},

// ===== HASHMAP (продолжение) =====
{id:"hf7",t:"Группировка чисел-анаграмм",p:"HashMap",d:"средне",
desc:`Сгруппировать числа, чьи цифры являются анаграммами друг друга.

Пример:
Ввод: [123, 321, 213, 45, 54, 100]
Вывод: [[123, 321, 213], [45, 54], [100]]

Ввод: [11, 22, 11]
Вывод: [[11, 11], [22]]`,
hint:`Ключ в HashMap — отсортированные цифры числа. Группируем числа с одинаковым ключом.`,
code:`class Solution {
    public List<List<Integer>> groupAnagramNumbers(
            int[] nums) {
        Map<String, List<Integer>> map = new HashMap<>();

        for (int num : nums) {
            char[] digits = String.valueOf(num)
                .toCharArray();
            Arrays.sort(digits);
            String key = new String(digits);
            map.computeIfAbsent(key,
                k -> new ArrayList<>()).add(num);
        }

        return new ArrayList<>(map.values());
    }
}`,
expl:`Для каждого числа сортируем его цифры — это ключ в HashMap. Числа с одинаковым ключом — анаграммы. O(n × d log d), где d — кол-во цифр.`},

{id:"tp18",t:"Односторонняя разница",p:"Two Pointers",d:"легко",
desc:`Дан отсортированный массив и число k >= 0. Посчитать количество пар (i, j), где i < j и nums[j] - nums[i] == k.

Пример:
Ввод: nums = [1, 2, 3, 4, 5], k = 2
Вывод: 3 (пары: (1,3), (2,4), (3,5))

Ввод: nums = [1, 1, 1], k = 0
Вывод: 3`,
hint:`Два указателя. Если разница < k — двигаем правый. Если > k — двигаем левый. Если == k — считаем.`,
code:`class Solution {
    public int countPairsWithDiff(int[] nums, int k) {
        Arrays.sort(nums);
        int count = 0;
        int left = 0, right = 1;

        while (right < nums.length) {
            int diff = nums[right] - nums[left];

            if (diff == k) {
                count++;
                int lv = nums[left];
                int rv = nums[right];
                int lc = 0, rc = 0;
                while (left < nums.length
                    && nums[left] == lv) {
                    left++; lc++;
                }
                while (right < nums.length
                    && nums[right] == rv) {
                    right++; rc++;
                }
                if (k == 0) {
                    count += lc * (lc - 1) / 2 - 1;
                } else {
                    count += lc * rc - 1;
                }
            } else if (diff < k) {
                right++;
            } else {
                left++;
                if (left == right) right++;
            }
        }

        return count;
    }
}`,
expl:`Сортируем массив. Два указателя: если diff < k — right++, если diff > k — left++. При diff == k считаем количество дубликатов и переходим дальше. O(n log n).`},

{id:"tp19",t:"Подсчёт пар с разницей >= К",p:"Two Pointers",d:"средне",
desc:`Дан массив nums и число k. Посчитать количество пар (i, j), где i < j и |nums[i] - nums[j]| >= k.

Пример:
Ввод: nums = [1, 3, 7, 2], k = 4
Вывод: 3 (пары: (1,7), (3,7), (7,2) → разницы: 6, 4, 5)

Ввод: nums = [1, 5, 3, 9], k = 5
Вывод: 3`,
hint:`Сортируем. Два указателя: если nums[r] - nums[l] >= k, то все пары (l, l+1..r) для r подходят.`,
code:`class Solution {
    public long countPairs(int[] nums, int k) {
        Arrays.sort(nums);
        long count = 0;
        int n = nums.length;

        for (int r = 1; r < n; r++) {
            int lo = 0, hi = r - 1, pos = r;
            while (lo <= hi) {
                int mid = lo + (hi - lo) / 2;
                if (nums[r] - nums[mid] >= k) {
                    pos = mid;
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
            if (pos < r
                && nums[r] - nums[pos] >= k) {
                count += (r - pos);
            }
        }

        return count;
    }
}`,
expl:`Сортируем массив. Для каждого r бинарным поиском находим самый правый l, где nums[r] - nums[l] >= k. Все элементы от l до r-1 образуют подходящие пары. O(n log n).`},

{id:"tp20",t:"Рост акций компании",p:"Two Pointers",d:"средне",
desc:`Дан массив цен акций по дням. Найти максимальную прибыль от одной покупки и одной продажи (купить раньше, продать позже).

Пример:
Ввод: [7, 1, 5, 3, 6, 4]
Вывод: 5 (купить за 1, продать за 6)

Ввод: [7, 6, 4, 3, 1]
Вывод: 0 (цена только падает)`,
hint:`Отслеживаем минимальную цену слева. На каждом шаге обновляем максимальную прибыль.`,
code:`class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else {
                maxProfit = Math.max(maxProfit,
                    price - minPrice);
            }
        }

        return maxProfit;
    }
}`,
expl:`Один проход: отслеживаем минимальную цену. Для каждого дня — потенциальная прибыль = price - minPrice. Обновляем максимум. O(n) время, O(1) память.`},

{id:"tp21",t:"URL-ификация строки",p:"Two Pointers",d:"средне",
desc:`Заменить все пробелы в строке на "%20". Дана строка с дополнительным местом в конце и реальная длина.

Пример:
Ввод: "Mr John Smith    ", trueLength = 13
Вывод: "Mr%20John%20Smith"

Ввод: "hello world  ", trueLength = 11
Вывод: "hello%20world"`,
hint:`Считаем пробелы → вычисляем новую длину. Два указателя с конца: копируем символы или записываем %20.`,
code:`class Solution {
    public String urlify(char[] str, int trueLength) {
        int spaceCount = 0;
        for (int i = 0; i < trueLength; i++) {
            if (str[i] == ' ') spaceCount++;
        }

        int newLen = trueLength + spaceCount * 2;
        int w = newLen - 1;

        for (int i = trueLength - 1; i >= 0; i--) {
            if (str[i] == ' ') {
                str[w--] = '0';
                str[w--] = '2';
                str[w--] = '%';
            } else {
                str[w--] = str[i];
            }
        }

        return new String(str, 0, newLen);
    }
}`,
expl:`Два прохода: считаем пробелы, затем заполняем с конца. Каждый пробел заменяется на '%20' (3 символа вместо 1). O(n) время, O(1) дополнительная память.`},

{id:"tp22",t:"Самый большой контейнер (11)",p:"Two Pointers",d:"средне",
desc:`Дан массив heights. Найти два столбца, которые вместе с осью X образуют контейнер с наибольшим количеством воды.

Вода = min(height[l], height[r]) × (r - l)

Пример:
Ввод: [1, 8, 6, 2, 5, 4, 8, 3, 7]
Вывод: 49

Ввод: [1, 1]
Вывод: 1`,
hint:`Два указателя с краёв. Сдвигаем тот, чья высота меньше.`,
code:`class Solution {
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int maxWater = 0;

        while (left < right) {
            int water = Math.min(height[left],
                height[right]) * (right - left);
            maxWater = Math.max(maxWater, water);

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxWater;
    }
}`,
expl:`Жадный подход с двумя указателями. Сдвигаем меньший столбец — сдвиг большего не может увеличить площадь (высота ограничена меньшим). O(n) время, O(1) память.`},

{id:"tp23",t:"Выпилить смайлики из текста",p:"Two Pointers",d:"средне",
desc:`Удалить все смайлики из строки. Смайлик — последовательность: двоеточие, минус, одна или несколько скобок ) или (.

Примеры смайликов: :-) :-( :-)))) :-((

Пример:
Ввод: "Hello:-) World:-("
Вывод: "Hello World"

Ввод: ":-)))test:-(("
Вывод: "test"`,
hint:`Указатель записи. При обнаружении ':' проверяем, начинается ли смайлик. Если да — пропускаем, иначе записываем.`,
code:`class Solution {
    public String removeSmileys(String s) {
        char[] arr = s.toCharArray();
        int w = 0;

        int i = 0;
        while (i < arr.length) {
            if (i + 2 < arr.length
                && arr[i] == ':'
                && arr[i + 1] == '-'
                && (arr[i + 2] == ')'
                    || arr[i + 2] == '(')) {
                i += 2;
                while (i < arr.length
                    && (arr[i] == ')'
                        || arr[i] == '(')) {
                    i++;
                }
            } else {
                arr[w++] = arr[i++];
            }
        }

        return new String(arr, 0, w);
    }
}`,
expl:`Указатель записи w. При обнаружении паттерна ':' + '-' + скобки — пропускаем весь смайлик (включая повторяющиеся скобки). Иначе копируем символ. O(n).`},

// ===== TREES / DFS (продолжение) =====
{id:"tr5",t:"Поиск ближайшего значения в BST",p:"Trees / DFS",d:"средне",
desc:`Найти значение в BST, ближайшее к заданному target (double).

Пример:
Дерево: [4, 2, 5, 1, 3], target = 3.7
Вывод: 4

Дерево: [1], target = 4.5
Вывод: 1`,
hint:`Спускаемся по BST: если target < node.val — идём влево, иначе вправо. На каждом шаге обновляем ближайший.`,
code:`class Solution {
    public int closestValue(TreeNode root,
                            double target) {
        int closest = root.val;

        while (root != null) {
            if (Math.abs(root.val - target)
                < Math.abs(closest - target)) {
                closest = root.val;
            }

            root = target < root.val
                ? root.left : root.right;
        }

        return closest;
    }
}`,
expl:`Итеративный спуск по BST. На каждом шаге обновляем closest, если текущий узел ближе к target. Идём влево если target < val, иначе вправо. O(h) время, O(1) память.`},

{id:"tr6",t:"Обход дерева зигзагом",p:"Trees / DFS",d:"легко",
desc:`BFS по уровням, но нечётные уровни обходить справа налево.

Пример:
Дерево:
    3
   / \\
  9  20
    /  \\
   15   7
Вывод: [[3], [20, 9], [15, 7]]`,
hint:`BFS с очередью. На чётных уровнях добавляем в конец списка, на нечётных — в начало (или reverse).`,
code:`class Solution {
    public List<List<Integer>> zigzagLevelOrder(
            TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        boolean leftToRight = true;

        while (!queue.isEmpty()) {
            int size = queue.size();
            LinkedList<Integer> level =
                new LinkedList<>();

            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (leftToRight) {
                    level.addLast(node.val);
                } else {
                    level.addFirst(node.val);
                }
                if (node.left != null)
                    queue.add(node.left);
                if (node.right != null)
                    queue.add(node.right);
            }

            result.add(level);
            leftToRight = !leftToRight;
        }

        return result;
    }
}`,
expl:`BFS по уровням. Чередуем направление: чётные уровни — addLast, нечётные — addFirst (LinkedList как deque). O(n) время и память.`},

{id:"tr7",t:"Same Tree (100)",p:"Trees / DFS",d:"легко",
desc:`Проверить, одинаковы ли два бинарных дерева (структура и значения совпадают).

Пример:
p = [1, 2, 3], q = [1, 2, 3] → true
p = [1, 2], q = [1, null, 2] → false`,
hint:`Рекурсивно сравниваем: оба null → true, один null → false, значения разные → false. Иначе проверяем детей.`,
code:`class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;

        return isSameTree(p.left, q.left)
            && isSameTree(p.right, q.right);
    }
}`,
expl:`Рекурсия: базовые случаи — оба null (true), один null (false), значения разные (false). Иначе рекурсивно проверяем левые и правые поддеревья. O(n) время, O(h) стек.`},

{id:"tr8",t:"Balanced Binary Tree (110)",p:"Trees / DFS",d:"легко",
desc:`Проверить, является ли бинарное дерево сбалансированным по высоте (разница высот поддеревьев любого узла ≤ 1).

Пример:
    3
   / \\
  9  20
    /  \\
   15   7  → true

      1
     / \\
    2   2
   / \\
  3   3
 / \\
4   4  → false`,
hint:`Рекурсивная функция возвращает высоту или -1 (если несбалансировано). Проверяем |left - right| <= 1.`,
code:`class Solution {
    public boolean isBalanced(TreeNode root) {
        return height(root) != -1;
    }

    private int height(TreeNode node) {
        if (node == null) return 0;

        int left = height(node.left);
        if (left == -1) return -1;

        int right = height(node.right);
        if (right == -1) return -1;

        if (Math.abs(left - right) > 1) return -1;

        return Math.max(left, right) + 1;
    }
}`,
expl:`Возвращаем -1 как сигнал несбалансированности. Для каждого узла проверяем |leftH - rightH| <= 1. Рано прерываемся при -1. O(n) время, O(h) стек.`},

{id:"tr9",t:"Path Sum II (113)",p:"Trees / DFS",d:"средне",
desc:`Найти все пути от корня до листа, где сумма значений узлов равна targetSum.

Пример:
Дерево:
       5
      / \\
     4   8
    /   / \\
   11  13  4
  /  \\    / \\
 7    2  5   1
targetSum = 22
Вывод: [[5,4,11,2], [5,8,4,5]]`,
hint:`DFS с backtracking: добавляем узел в путь, при листе проверяем сумму, при возврате удаляем последний.`,
code:`class Solution {
    private List<List<Integer>> result =
        new ArrayList<>();

    public List<List<Integer>> pathSum(TreeNode root,
                                       int targetSum) {
        dfs(root, targetSum, new ArrayList<>());
        return result;
    }

    private void dfs(TreeNode node, int remaining,
                     List<Integer> path) {
        if (node == null) return;

        path.add(node.val);
        remaining -= node.val;

        if (node.left == null && node.right == null
            && remaining == 0) {
            result.add(new ArrayList<>(path));
        } else {
            dfs(node.left, remaining, path);
            dfs(node.right, remaining, path);
        }

        path.remove(path.size() - 1);
    }
}`,
expl:`DFS + backtracking. На каждом узле: добавляем в путь, вычитаем из remaining. На листе: если remaining == 0 — нашли путь. При возврате удаляем последний элемент. O(n) обход, O(n²) для копирования путей.`},

{id:"tr10",t:"Lowest Common Ancestor III (1650)",p:"Trees / DFS",d:"средне",
desc:`Найти наименьшего общего предка (LCA) двух узлов p и q в бинарном дереве. Узлы могут отсутствовать в дереве.

Пример:
Дерево: [3, 5, 1, 6, 2, 0, 8]
p = 5, q = 1 → LCA = 3
p = 5, q = 4 → null (4 нет в дереве)`,
hint:`DFS возвращает найденный узел. Если оба найдены в разных поддеревьях — текущий узел и есть LCA. Дополнительно проверяем, что оба узла найдены.`,
code:`class Solution {
    private boolean foundP = false;
    private boolean foundQ = false;

    public TreeNode lowestCommonAncestor(
            TreeNode root, TreeNode p, TreeNode q) {
        TreeNode lca = dfs(root, p, q);
        return (foundP && foundQ) ? lca : null;
    }

    private TreeNode dfs(TreeNode node,
                         TreeNode p, TreeNode q) {
        if (node == null) return null;

        TreeNode left = dfs(node.left, p, q);
        TreeNode right = dfs(node.right, p, q);

        if (node == p) { foundP = true; return node; }
        if (node == q) { foundQ = true; return node; }

        if (left != null && right != null)
            return node;

        return left != null ? left : right;
    }
}`,
expl:`DFS обходит всё дерево (не останавливается рано). Флаги foundP/foundQ подтверждают, что оба узла найдены. Если один в левом поддереве, другой в правом — текущий узел = LCA. O(n).`},

{id:"tr11",t:"Повторяющиеся поддеревья (652)",p:"Trees / DFS",d:"средне",
desc:`Найти все повторяющиеся поддеревья в бинарном дереве. Вернуть корневые узлы дубликатов.

Пример:
Дерево:
    1
   / \\
  2   3
 /   / \\
4   2   4
   /
  4
Вывод: [[2, 4], [4]] (поддерево "4" и поддерево "2->4" повторяются)`,
hint:`Сериализуем каждое поддерево в строку. HashMap считает количество одинаковых сериализаций.`,
code:`class Solution {
    private Map<String, Integer> count =
        new HashMap<>();
    private List<TreeNode> result = new ArrayList<>();

    public List<TreeNode> findDuplicateSubtrees(
            TreeNode root) {
        serialize(root);
        return result;
    }

    private String serialize(TreeNode node) {
        if (node == null) return "#";

        String s = node.val + ","
            + serialize(node.left) + ","
            + serialize(node.right);

        int c = count.merge(s, 1, Integer::sum);
        if (c == 2) result.add(node);

        return s;
    }
}`,
expl:`Сериализуем каждое поддерево в строку (preorder). HashMap считает вхождения каждой сериализации. При count == 2 — добавляем в результат (ровно один раз). O(n²) из-за конкатенации строк.`},

{id:"tr12",t:"Поиск k-ого наибольшего в BST",p:"Trees / DFS",d:"средне",
desc:`Найти k-й наибольший элемент в BST.

Пример:
Дерево: [5, 3, 6, 2, 4, null, null, 1]
k = 3 → Вывод: 4 (в порядке убывания: 6, 5, 4, 3, 2, 1)

Дерево: [3, 1, 4, null, 2]
k = 1 → Вывод: 4`,
hint:`Обратный inorder (right → node → left) даёт убывающий порядок. Останавливаемся на k-м.`,
code:`class Solution {
    private int count = 0;
    private int result = 0;

    public int kthLargest(TreeNode root, int k) {
        reverseInorder(root, k);
        return result;
    }

    private void reverseInorder(TreeNode node, int k) {
        if (node == null || count >= k) return;

        reverseInorder(node.right, k);

        count++;
        if (count == k) {
            result = node.val;
            return;
        }

        reverseInorder(node.left, k);
    }
}`,
expl:`Обратный inorder-обход (right → node → left) выдаёт элементы BST в убывающем порядке. Останавливаемся на k-м элементе. O(H + k) время.`},

{id:"tr13",t:"Проверка всех листьев",p:"Trees / DFS",d:"легко",
desc:`Проверить, что все листья бинарного дерева находятся на одной глубине.

Пример:
    1
   / \\
  2   3
 / \\   \\
4   5   6  → true (все листья на глубине 2)

    1
   / \\
  2   3
 /
4  → false (лист 3 на глубине 1, лист 4 на глубине 2)`,
hint:`DFS, запоминаем глубину первого листа. Все остальные листья должны иметь ту же глубину.`,
code:`class Solution {
    private int leafDepth = -1;

    public boolean checkLeaves(TreeNode root) {
        return dfs(root, 0);
    }

    private boolean dfs(TreeNode node, int depth) {
        if (node == null) return true;

        if (node.left == null
            && node.right == null) {
            if (leafDepth == -1) {
                leafDepth = depth;
            }
            return depth == leafDepth;
        }

        return dfs(node.left, depth + 1)
            && dfs(node.right, depth + 1);
    }
}`,
expl:`DFS с отслеживанием глубины. Первый лист задаёт эталонную глубину. Все остальные листья должны совпадать. O(n) время, O(h) стек.`},

{id:"tr14",t:"Сумма от корня до листа",p:"Trees / DFS",d:"средне",
desc:`Каждый путь от корня до листа формирует число (корень — старший разряд). Найти сумму всех таких чисел.

Пример:
    1
   / \\
  2   3
Числа: 12, 13
Вывод: 25

    4
   / \\
  9   0
 / \\
5   1
Числа: 495, 491, 40
Вывод: 1026`,
hint:`DFS: на каждом узле currentNum = currentNum * 10 + node.val. На листе — добавляем к сумме.`,
code:`class Solution {
    public int sumNumbers(TreeNode root) {
        return dfs(root, 0);
    }

    private int dfs(TreeNode node, int currentNum) {
        if (node == null) return 0;

        currentNum = currentNum * 10 + node.val;

        if (node.left == null
            && node.right == null) {
            return currentNum;
        }

        return dfs(node.left, currentNum)
            + dfs(node.right, currentNum);
    }
}`,
expl:`DFS: на каждом узле формируем число currentNum * 10 + val. На листе возвращаем число. Суммируем все пути. O(n) время, O(h) стек.`},

// ===== HASHMAP (продолжение 2) =====
{id:"hf8",t:"Count Pairs With Absolute Diff K (2006)",p:"HashMap",d:"легко",
desc:`Дан массив nums и число k. Посчитать количество пар (i, j), где i < j и |nums[i] - nums[j]| == k.

Пример:
Ввод: nums = [1, 2, 2, 1], k = 1
Вывод: 4

Ввод: nums = [1, 3], k = 3
Вывод: 0`,
hint:`HashMap для подсчёта. Для каждого элемента ищем count(val - k) и count(val + k).`,
code:`class Solution {
    public int countKDifference(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        int count = 0;

        for (int num : nums) {
            count += freq.getOrDefault(num - k, 0);
            count += freq.getOrDefault(num + k, 0);
            freq.merge(num, 1, Integer::sum);
        }

        return count;
    }
}`,
expl:`Для каждого num ищем в HashMap сколько раз встречались num-k и num+k ранее. Добавляем к count. O(n) время, O(n) память.`},

{id:"hf9",t:"Intersection of Two Arrays II (350)",p:"HashMap",d:"легко",
desc:`Найти пересечение двух массивов с учётом кратности (каждый элемент в результате появляется столько раз, сколько он встречается в обоих).

Пример:
Ввод: nums1 = [1,2,2,1], nums2 = [2,2]
Вывод: [2,2]

Ввод: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Вывод: [4,9] (порядок не важен)`,
hint:`HashMap с частотами первого массива. Проходим второй — при наличии записи добавляем в результат и уменьшаем.`,
code:`class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int num : nums1) {
            freq.merge(num, 1, Integer::sum);
        }

        List<Integer> result = new ArrayList<>();
        for (int num : nums2) {
            int count = freq.getOrDefault(num, 0);
            if (count > 0) {
                result.add(num);
                freq.put(num, count - 1);
            }
        }

        return result.stream()
            .mapToInt(Integer::intValue).toArray();
    }
}`,
expl:`HashMap хранит частоты nums1. Для каждого элемента nums2: если freq > 0 — добавляем в результат и уменьшаем freq. O(n+m) время, O(min(n,m)) память.`},

// ===== SLIDING WINDOW (продолжение 2) =====
{id:"sw12",t:"Minimum Size Subarray Sum (209)",p:"Sliding Window",d:"средне",
desc:`Дан массив положительных чисел nums и число target. Найти минимальную длину непрерывного подмассива с суммой >= target. Если такого нет — вернуть 0.

Пример:
Ввод: target = 7, nums = [2,3,1,2,4,3]
Вывод: 2 (подмассив [4,3])

Ввод: target = 4, nums = [1,4,4]
Вывод: 1

Ввод: target = 11, nums = [1,1,1,1,1]
Вывод: 0`,
hint:`Скользящее окно: расширяем правый край, пока сумма < target. Затем сжимаем левый, обновляя минимум.`,
code:`class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int sum = 0;
        int minLen = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length;
             right++) {
            sum += nums[right];

            while (sum >= target) {
                minLen = Math.min(minLen,
                    right - left + 1);
                sum -= nums[left];
                left++;
            }
        }

        return minLen == Integer.MAX_VALUE
            ? 0 : minLen;
    }
}`,
expl:`Скользящее окно: расширяем правый край, добавляя к сумме. Когда sum >= target — сжимаем слева, обновляя минимальную длину. Каждый элемент добавляется и удаляется один раз → O(n).`},

// ===== WINDOW + DEQUE (продолжение) =====
{id:"swd2",t:"Sliding Window Maximum (239)",p:"Window + Deque",d:"сложно",
desc:`Дан массив nums и размер окна k. Для каждой позиции окна вернуть максимум.

Пример:
Ввод: nums = [1,3,-1,-3,5,3,6,7], k = 3
Вывод: [3,3,5,5,6,7]

Объяснение:
Окно [1,3,-1] → 3
Окно [3,-1,-3] → 3
Окно [-1,-3,5] → 5
Окно [-3,5,3] → 5
Окно [5,3,6] → 6
Окно [3,6,7] → 7`,
hint:`Монотонный убывающий дек. Голова — индекс максимума в окне. Удаляем из хвоста элементы <= текущего.`,
code:`class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!deque.isEmpty()
                && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }

            while (!deque.isEmpty()
                && nums[deque.peekLast()]
                    <= nums[i]) {
                deque.pollLast();
            }

            deque.addLast(i);

            if (i >= k - 1) {
                result[i - k + 1] =
                    nums[deque.peekFirst()];
            }
        }

        return result;
    }
}`,
expl:`Монотонный убывающий дек хранит индексы. Голова = индекс максимума окна. При добавлении нового элемента удаляем из хвоста все меньшие/равные. Удаляем из головы вышедшие за окно. Каждый элемент push/pop один раз → O(n).`},

// ===== TWO POINTERS (продолжение 2) =====
{id:"tp24",t:"One Edit Distance (161)",p:"Two Pointers",d:"средне",
desc:`Проверить, находятся ли две строки на расстоянии ровно одной правки (вставка, удаление или замена одного символа).

Пример:
Ввод: s = "ab", t = "acb" → true (вставка 'c')
Ввод: s = "cab", t = "ad" → false
Ввод: s = "", t = "" → false (0 правок, не 1)
Ввод: s = "a", t = "A" → true (замена)`,
hint:`Если длины равны — ищем ровно одну замену. Если разница 1 — ищем одну вставку. Иначе false.`,
code:`class Solution {
    public boolean isOneEditDistance(String s,
                                     String t) {
        int ns = s.length(), nt = t.length();
        if (Math.abs(ns - nt) > 1) return false;
        if (ns > nt)
            return isOneEditDistance(t, s);

        for (int i = 0; i < ns; i++) {
            if (s.charAt(i) != t.charAt(i)) {
                if (ns == nt) {
                    return s.substring(i + 1)
                        .equals(t.substring(i + 1));
                } else {
                    return s.substring(i)
                        .equals(t.substring(i + 1));
                }
            }
        }

        return ns + 1 == nt;
    }
}`,
expl:`Если длины равны — при первом расхождении проверяем, что остальные совпадают (замена). Если разница 1 — пропускаем символ в длинной строке (вставка/удаление). O(n).`},

{id:"tp25",t:"Longest Palindrome Two Letter Words (2131)",p:"Two Pointers",d:"средне",
desc:`Дан массив слов из двух букв. Найти длину самого длинного палиндрома, который можно составить из этих слов.

Пример:
Ввод: ["lc","cl","gg"]
Вывод: 6 ("lc" + "gg" + "cl" = "lcggcl")

Ввод: ["ab","ty","gy","ba"]
Вывод: 4 ("ab" + "ba" = "abba")

Ввод: ["cc","ll","xx"]
Вывод: 2 (одно слово-палиндром в центре)`,
hint:`HashMap для подсчёта. Для каждого слова ищем его реверс. Слова-палиндромы (aa, bb) обрабатываем отдельно: пары + один в центре.`,
code:`class Solution {
    public int longestPalindrome(String[] words) {
        Map<String, Integer> freq = new HashMap<>();
        int length = 0;
        boolean centerUsed = false;

        for (String w : words) {
            freq.merge(w, 1, Integer::sum);
        }

        for (String w : freq.keySet()) {
            String rev = "" + w.charAt(1) + w.charAt(0);
            if (w.equals(rev)) {
                int cnt = freq.get(w);
                length += (cnt / 2) * 4;
                if (cnt % 2 == 1 && !centerUsed) {
                    length += 2;
                    centerUsed = true;
                }
            } else if (w.compareTo(rev) < 0
                && freq.containsKey(rev)) {
                int pairs = Math.min(freq.get(w),
                    freq.get(rev));
                length += pairs * 4;
            }
        }

        return length;
    }
}`,
expl:`Для пар (ab, ba): берём min(count) пар, каждая даёт +4. Для палиндромов (aa): пары дают +4, один нечётный можно в центр (+2). O(n) время.`},

{id:"tp26",t:"Shortest Word Distance (243)",p:"Two Pointers",d:"легко",
desc:`Дан массив слов и два слова word1, word2. Найти минимальное расстояние (разница индексов) между ними.

Пример:
Ввод: words = ["practice","makes","perfect","coding","makes"], word1 = "coding", word2 = "practice"
Вывод: 3

Ввод: words = ["a","b","c","d","b"], word1 = "a", word2 = "b"
Вывод: 1`,
hint:`Один проход: запоминаем последнюю позицию word1 и word2. При обновлении любой — считаем расстояние.`,
code:`class Solution {
    public int shortestDistance(String[] words,
            String word1, String word2) {
        int pos1 = -1, pos2 = -1;
        int minDist = Integer.MAX_VALUE;

        for (int i = 0; i < words.length; i++) {
            if (words[i].equals(word1)) {
                pos1 = i;
            } else if (words[i].equals(word2)) {
                pos2 = i;
            }

            if (pos1 != -1 && pos2 != -1) {
                minDist = Math.min(minDist,
                    Math.abs(pos1 - pos2));
            }
        }

        return minDist;
    }
}`,
expl:`Один проход: обновляем позицию при нахождении word1 или word2. Если обе позиции известны — считаем расстояние. O(n) время, O(1) память.`},

{id:"tp27",t:"Shortest Distance to Character (821)",p:"Two Pointers",d:"легко",
desc:`Дана строка s и символ c (гарантированно есть в s). Для каждой позиции найти расстояние до ближайшего вхождения c.

Пример:
Ввод: s = "loveleetcode", c = 'e'
Вывод: [3,2,1,0,1,0,0,1,2,2,1,0]`,
hint:`Два прохода: слева направо (расстояние от последнего c слева) и справа налево (от ближайшего c справа). Берём минимум.`,
code:`class Solution {
    public int[] shortestToChar(String s, char c) {
        int n = s.length();
        int[] result = new int[n];
        int prev = -n;

        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == c) prev = i;
            result[i] = i - prev;
        }

        prev = 2 * n;
        for (int i = n - 1; i >= 0; i--) {
            if (s.charAt(i) == c) prev = i;
            result[i] = Math.min(result[i],
                prev - i);
        }

        return result;
    }
}`,
expl:`Два прохода: слева→ записываем расстояние от последнего c. Справа→ обновляем минимумом с расстоянием от ближайшего c справа. O(n) время, O(1) доп. память.`},

// ===== INTERVALS SWEEP (продолжение) =====
{id:"iss6",t:"Missing Ranges (163)",p:"Intervals Sweep",d:"легко",
desc:`Дан отсортированный массив уникальных чисел и границы [lower, upper]. Найти все пропущенные диапазоны.

Пример:
Ввод: nums = [0, 1, 3, 50, 75], lower = 0, upper = 99
Вывод: ["2", "4->49", "51->74", "76->99"]

Ввод: nums = [], lower = 1, upper = 1
Вывод: ["1"]`,
hint:`Идём по массиву, отслеживая ожидаемое следующее число. Если nums[i] > expected — формируем диапазон.`,
code:`class Solution {
    public List<String> findMissingRanges(
            int[] nums, int lower, int upper) {
        List<String> result = new ArrayList<>();
        long next = lower;

        for (int num : nums) {
            if (num > next) {
                result.add(formatRange(next,
                    (long) num - 1));
            }
            next = (long) num + 1;
        }

        if (next <= upper) {
            result.add(formatRange(next, upper));
        }

        return result;
    }

    private String formatRange(long from, long to) {
        if (from == to) return String.valueOf(from);
        return from + "->" + to;
    }
}`,
expl:`Отслеживаем следующее ожидаемое число (next). Если текущий элемент > next — есть пропуск. Форматируем одиночное число или диапазон. O(n) время.`},

{id:"iss7",t:"Summary Ranges (228)",p:"Intervals Sweep",d:"легко",
desc:`Дан отсортированный массив без дубликатов. Свернуть последовательные числа в диапазоны "a->b".

Пример:
Ввод: [0, 1, 2, 4, 5, 7]
Вывод: ["0->2", "4->5", "7"]

Ввод: [0, 2, 3, 4, 6, 8, 9]
Вывод: ["0", "2->4", "6", "8->9"]`,
hint:`Два указателя: start и i расширяют диапазон последовательных чисел.`,
code:`class Solution {
    public List<String> summaryRanges(int[] nums) {
        List<String> result = new ArrayList<>();
        int i = 0;

        while (i < nums.length) {
            int start = nums[i];
            while (i + 1 < nums.length
                && nums[i + 1] == nums[i] + 1) {
                i++;
            }

            if (start == nums[i]) {
                result.add(String.valueOf(start));
            } else {
                result.add(start + "->" + nums[i]);
            }
            i++;
        }

        return result;
    }
}`,
expl:`Группируем последовательные числа (nums[i+1] == nums[i] + 1). Одиночные — как число, диапазоны — как "start->end". O(n) время, O(1) доп. память.`},

{id:"iss8",t:"Interval List Intersections (986)",p:"Intervals Sweep",d:"средне",
desc:`Даны два списка непересекающихся отсортированных интервалов. Найти их пересечения.

Пример:
Ввод:
  A = [[0,2],[5,10],[13,23],[24,25]]
  B = [[1,5],[8,12],[15,24],[25,26]]
Вывод: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]`,
hint:`Два указателя. Пересечение: [max(start1,start2), min(end1,end2)]. Двигаем указатель с меньшим end.`,
code:`class Solution {
    public int[][] intervalIntersection(
            int[][] firstList, int[][] secondList) {
        List<int[]> result = new ArrayList<>();
        int i = 0, j = 0;

        while (i < firstList.length
            && j < secondList.length) {
            int lo = Math.max(firstList[i][0],
                secondList[j][0]);
            int hi = Math.min(firstList[i][1],
                secondList[j][1]);

            if (lo <= hi) {
                result.add(new int[]{lo, hi});
            }

            if (firstList[i][1] < secondList[j][1]) {
                i++;
            } else {
                j++;
            }
        }

        return result.toArray(new int[result.size()][]);
    }
}`,
expl:`Два указателя по спискам. Пересечение = [max(starts), min(ends)], если lo <= hi. Двигаем указатель, чей интервал заканчивается раньше. O(n+m) время.`},

// ===== PREFIX SUM (продолжение) =====
{id:"ps3",t:"Prefix Common Array (2657)",p:"Prefix Sum",d:"средне",
desc:`Даны две перестановки A и B длины n (числа от 1 до n). Найти массив C, где C[i] = количество чисел, которые присутствуют и в A[0..i], и в B[0..i].

LeetCode 2657. (Аналогичен pse5, но категория Prefix Sum.)

Пример:
Ввод: A = [1,3,2,4], B = [3,1,2,4]
Вывод: [0,2,3,4]

Ввод: A = [2,3,1], B = [3,1,2]
Вывод: [0,1,3]`,
hint:`Массив freq[1..n]. При встрече числа увеличиваем freq. Когда freq[v] == 2 — число есть в обоих префиксах.`,
code:`class Solution {
    public int[] findThePrefixCommonArray(
            int[] A, int[] B) {
        int n = A.length;
        int[] freq = new int[n + 1];
        int[] C = new int[n];
        int common = 0;

        for (int i = 0; i < n; i++) {
            freq[A[i]]++;
            if (freq[A[i]] == 2) common++;

            freq[B[i]]++;
            if (freq[B[i]] == 2) common++;

            C[i] = common;
        }

        return C;
    }
}`,
expl:`Перестановки содержат числа 1..n по одному разу. freq[v] считает суммарные вхождения. Когда freq == 2 — число встречено в обоих массивах. O(n) время и память.`},

// ===== SLIDING WINDOW (продолжение 3) =====
{id:"sw13",t:"Longest Continuous Increasing Subsequence (674)",p:"Sliding Window",d:"легко",
desc:`Найти длину самой длинной непрерывно возрастающей подпоследовательности (подмассива).

Пример:
Ввод: [1, 3, 5, 4, 7]
Вывод: 3 (подмассив [1, 3, 5])

Ввод: [2, 2, 2, 2]
Вывод: 1`,
hint:`Один проход: считаем длину текущей возрастающей серии. При нарушении — сбрасываем.`,
code:`class Solution {
    public int findLengthOfLCIS(int[] nums) {
        if (nums.length == 0) return 0;
        int maxLen = 1, curLen = 1;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1]) {
                curLen++;
                maxLen = Math.max(maxLen, curLen);
            } else {
                curLen = 1;
            }
        }

        return maxLen;
    }
}`,
expl:`Один проход: если nums[i] > nums[i-1] — увеличиваем текущую длину. Иначе сбрасываем в 1. Отслеживаем максимум. O(n) время, O(1) память.`},

// ===== MATH / SIMULATION (продолжение 2) =====
{id:"ms6",t:"Умножение строк (43)",p:"Math / Simulation",d:"средне",
desc:`Даны два неотрицательных числа в виде строк. Вернуть их произведение в виде строки. Нельзя использовать BigInteger или встроенное умножение.

Пример:
Ввод: num1 = "2", num2 = "3"
Вывод: "6"

Ввод: num1 = "123", num2 = "456"
Вывод: "56088"`,
hint:`Умножение столбиком: result[i+j+1] += digit1 × digit2. Затем обработка переносов.`,
code:`class Solution {
    public String multiply(String num1, String num2) {
        int m = num1.length(), n = num2.length();
        int[] result = new int[m + n];

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int mul = (num1.charAt(i) - '0')
                    * (num2.charAt(j) - '0');
                int p1 = i + j;
                int p2 = i + j + 1;
                int sum = mul + result[p2];

                result[p2] = sum % 10;
                result[p1] += sum / 10;
            }
        }

        StringBuilder sb = new StringBuilder();
        for (int digit : result) {
            if (!(sb.length() == 0 && digit == 0)) {
                sb.append(digit);
            }
        }

        return sb.length() == 0 ? "0" : sb.toString();
    }
}`,
expl:`Умножение столбиком: произведение цифр num1[i] и num2[j] попадает в позиции [i+j] и [i+j+1]. Обработка переноса встроена. Ведущие нули удаляются. O(m×n) время.`}
];
