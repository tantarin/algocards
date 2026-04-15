const P = [
// ===== BACKTRACKING =====
{id:"bt1",t:"22. Generate Parentheses",p:"Backtracking",d:"средне",
desc:`Дано число n — количество пар скобок. Необходимо ==сгенерировать все допустимые комбинации== из n пар скобок.

Допустимая комбинация означает:
- Каждой открывающей скобке ( соответствует закрывающая )
- При чтении слева направо количество закрывающих никогда не превышает количество открывающих

Пример 1:
Ввод: n = 1
Вывод: ["()"]

Пример 2:
Ввод: n = 2
Вывод: ["(())", "()()"]

Пример 3:
Ввод: n = 3
Вывод: ["((()))", "(()())", "(())()", "()(())", "()()()"]

Ограничения:
- 1 ≤ n ≤ 8`,
hint:`Два счётчика open/close. Если open < n — добавляем '(', если close < open — добавляем ')'. По сути перебираем все варианты, но соблюдаем ограничения.`,
code:`class Solution {
    private List<String> result = new ArrayList<>();
    private int pairCount;

    public List<String> generateParenthesis(int n) {
        this.pairCount = n;
        backtrack(0, 0, "");
        return result;
    }

    private void backtrack(int openCount, int closeCount, String current) {
        // нарушен инвариант — ветка невалидна
        if (openCount > pairCount || closeCount > pairCount || openCount < closeCount) {
            return;
        }

        // использовали все n пар — готовая комбинация
        if (openCount == pairCount && closeCount == pairCount) {
            result.add(current);
            return;
        }

        backtrack(openCount + 1, closeCount, current + "(");
        backtrack(openCount, closeCount + 1, current + ")");
    }
}`,
complexity:`Время: O(4^n / √n), Память: O(n)`,
complexityExpl:`Рекурсивный DFS с двумя ветвлениями строит все скобочные последовательности; их число — число Каталана O(4^n/√n). Глубина рекурсии и длина строки — O(n) памяти.`,
expl:`Поиск в глубину с отсечением ветвей (DFS + pruning).
Отслеживаем open (открывающие) и close (закрывающие).
- Не добавляем больше n каждого типа
- close никогда не превышает open
- Когда open равен close и равен n — допустимая комбинация найдена`,
lcSimilar:[{"n":22,"t":"Generate Parentheses","h":"generate-parentheses"}]},

{id:"bt2",t:"Декартово произведение",p:"Backtracking",d:"средне",
desc:`Дано N массивов. Вернуть декартово произведение — ==все комбинации==, где из каждого массива выбран ровно один элемент.

Пример:
Ввод: [[1,2],[3],[4,5]]
Вывод: [[1,3,4],[1,3,5],[2,3,4],[2,3,5]]`,
hint:`Рекурсивно выбираем по одному элементу из каждого массива. После рекурсии — откатываем выбор (backtrack).`,
code:`class Solution {
    private List<List<Integer>> result = new ArrayList<>();

    public List<List<Integer>> cartesianProduct(List<List<Integer>> arrays) {
        backtrack(arrays, 0, new ArrayList<>());
        return result;
    }

    private void backtrack(List<List<Integer>> arrays, int idx, List<Integer> current) {
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
complexity:`Время: O(∏ |arrays[i]|), Память: O(k)`,
complexityExpl:`На каждом уровне перебираем элементы массива, рекурсия углубляется — всего перебирается произведение размеров. Глубина рекурсии = число массивов k — O(k) памяти.`,
expl:`На каждом уровне рекурсии выбираем элемент из соответствующего массива. После возврата удаляем последний элемент (backtrack). Когда idx == arrays.size() — комбинация готова.`,
lcSimilar:[{"t":"Find First and Last Position of Element in Sorted Array","h":"find-first-and-last-position-of-element-in-sorted-array"},{"t":"Binary Search","h":"binary-search"}],
repoSimilar:["bt1","bt3"],
diagram:{"type":"cartesian","input":[[1,2],[3],[4,5]],"steps":[{"idx":0,"current":[],"result":[],"activeArr":0,"activeVal":-1,"desc":"**Вход**: arrays = [[1,2],[3],[4,5]]. Начинаем с idx=0, current=[]"},{"idx":1,"current":[1],"result":[],"activeArr":0,"activeVal":0,"desc":"Из arrays[0]=[1,2] берём **1** → current=[1], переходим к idx=1"},{"idx":2,"current":[1,3],"result":[],"activeArr":1,"activeVal":0,"desc":"Из arrays[1]=[3] берём **3** → current=[1,3], переходим к idx=2"},{"idx":3,"current":[1,3,4],"result":[[1,3,4]],"activeArr":2,"activeVal":0,"desc":"Из arrays[2]=[4,5] берём **4** → idx=3 (конец), сохраняем [1,3,4]"},{"idx":3,"current":[1,3,5],"result":[[1,3,4],[1,3,5]],"activeArr":2,"activeVal":1,"desc":"Backtrack в arrays[2], берём **5** → сохраняем [1,3,5]"},{"idx":1,"current":[2],"result":[[1,3,4],[1,3,5]],"activeArr":0,"activeVal":1,"desc":"Backtrack до idx=0, теперь берём **2** → current=[2]"},{"idx":2,"current":[2,3],"result":[[1,3,4],[1,3,5]],"activeArr":1,"activeVal":0,"desc":"Из arrays[1] снова берём **3** → current=[2,3]"},{"idx":3,"current":[2,3,4],"result":[[1,3,4],[1,3,5],[2,3,4]],"activeArr":2,"activeVal":0,"desc":"Берём **4** из arrays[2] → сохраняем [2,3,4]"},{"idx":3,"current":[2,3,5],"result":[[1,3,4],[1,3,5],[2,3,4],[2,3,5]],"activeArr":2,"activeVal":1,"desc":"Берём **5** из arrays[2] → сохраняем [2,3,5]. Готово!"}]}},

{id:"bt3",t:"Перебор IP-адресов",p:"Backtracking",d:"средне",
desc:`Дана строка, содержащая только цифры. Вернуть ==все возможные валидные== IP-адреса.

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

    private void backtrack(String s, int start, List<String> parts) {
        // Набрали 4 части — проверяем, что использовали всю строку
        if (parts.size() == 4) {
            if (start == s.length()) {
                result.add(String.join(".", parts));
            }
            return;
        }

        // Пробуем длину октета 1, 2 или 3 символа
        for (int len = 1; len <= 3; len++) {
            if (start + len > s.length()) break;

            String segment = s.substring(start, start + len);
            
            // Запрещаем ведущие нули (например "01")
            if (segment.length() > 1 && segment.startsWith("0")) break;
            
            // Проверяем диапазон 0–255
            int val = Integer.parseInt(segment);
            if (val > 255) break;

            // Рекурсивный перебор
            parts.add(segment);
            backtrack(s, start + len, parts);
            parts.remove(parts.size() - 1); // откат
        }
    }
}`,
complexity:`Время: O(1) (3^4 = 81 ветвлений), Память: O(1)`,
complexityExpl:`Четыре октета, на каждом не более трёх длин — конечное дерево ветвлений (константа). Рекурсия глубины 4, список из 4 строк — O(1) памяти.`,
expl:`Разбиваем строку на 4 октета. Для каждого пробуем 1–3 цифры. Проверяем валидность: 0–255 без ведущих нулей. Когда 4 части и строка кончилась — IP найден.`},

{id:"bt4",t:"Remove Invalid Parentheses",p:"Backtracking",d:"сложно",
desc:`Дана строка, содержащая скобки и другие символы. ==Удалить минимальное количество невалидных скобок==, чтобы строка стала валидной. Вернуть все уникальные результаты.

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
            String next = s.substring(0, i) + s.substring(i + 1);
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
complexity:`Время: O(2^n · n), Память: O(n)`,
complexityExpl:`В худшем случае backtrack перебирает O(2^n) подпоследовательностей. Для каждой из них при openRem==0 && closeRem==0 вызывается isValid — линейный проход O(n). Итого O(2^n · n). Рекурсия глубины n, строки длиной n — O(n) памяти на уровень стека.`,
expl:`Считаем лишние открывающие и закрывающие скобки. Backtrack: пробуем удалить каждую, пропуская дубликаты (если s[i]==s[i-1]). Когда обе счётчика == 0, проверяем валидность строки.`},

// ===== BINARY SEARCH =====
{id:"bs1",t:"LC 33 — Search in Rotated Sorted Array",p:"Binary Search",d:"средне",
desc:`Дан целочисленный массив nums, изначально ==отсортированный по возрастанию==, содержащий уникальные значения. Массив мог быть ==повернут влево== в некоторой неизвестной точке k.

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

            // левая половина [left..mid] отсортирована
            if (nums[left] <= nums[mid]) {
                // target входит в отсортированный диапазон [left..mid)
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    // target вне левой половины — ищем справа
                    left = mid + 1;
                }
            } else {
                // правая половина [mid..right] отсортирована
                // target входит в отсортированный диапазон (mid..right]
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    // target вне правой половины — ищем слева
                    right = mid - 1;
                }
            }
        }

        return -1;
    }
}`,
complexity:`Время: O(log n), Память: O(1)`,
complexityExpl:`Цикл while каждый раз отбрасывает половину отрезка — за O(log n) итераций. Только несколько индексов — O(1) памяти.`,
expl:`O(log n) — пространство поиска уменьшается вдвое на каждой итерации. Одна из половин всегда отсортирована. Проверяем, попадает ли target в отсортированную часть.`},

{id:"bs2",t:" LC 34 — Find First and Last Position of Element in Sorted Array",p:"Binary Search",d:"средне",
desc:`Дан ==отсортированный массив== целых чисел nums и значение target. ==Найти первую и последнюю позиции== target. 

Пример:
Ввод: nums = [5,7,7,8,8,10], target = 8
Вывод: [3, 4]

Ввод: nums = [5,7,7,8,8,10], target = 6
Вывод: [-1, -1]`,
hint:`Два бинарных поиска: один ищет левую границу, другой — правую.`,
code:`class Solution {
    public int[] searchRange(int[] nums, int target) {
        int left = lowerBound(nums, target);
        int right = upperBound(nums, target) - 1;

        if (left == nums.length || nums[left] != target) {
            return new int[]{-1, -1};
        }

        return new int[]{left, right};
    }

    // Первый индекс i, такой что nums[i] >= target
    private int lowerBound(int[] nums, int target) {
        int lo = 0, hi = nums.length;

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;

            if (nums[mid] >= target) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }

        return lo;
    }

    // Первый индекс i, такой что nums[i] > target
    private int upperBound(int[] nums, int target) {
        int lo = 0, hi = nums.length;

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;

            if (nums[mid] > target) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }

        return lo;
    }
}`,
complexity:`Время: O(log n), Память: O(1)`,
complexityExpl:`Два бинарных поиска (findLeft + findRight) — суммарно O(log n). Константные переменные — O(1) памяти.`,
expl:`Для левой границы: при nums[mid]==target идём влево (hi=mid-1). Для правой: идём вправо (lo=mid+1). Оба поиска O(log n).`,
lcSimilar:[{"t":"Find First and Last Position of Element in Sorted Array","h":"find-first-and-last-position-of-element-in-sorted-array"},{"t":"Binary Search","h":"binary-search"}],
repoSimilar:["bs3"]},

{id:"bs3",t:"LeetCode 704. Binary Search",p:"Binary Search",d:"легко",
desc:`Дан отсортированный (по возрастанию) массив целых чисел nums и целое число target. Напишите функцию для поиска target в nums. Если target существует, верните его индекс, иначе верните -1.

Пример:
Ввод: nums = [1,3,5,7,9,11], target = 7
Вывод: 3`,
hint:`Классический подход lo/hi/mid. Сравниваем mid с target и сдвигаем границы.`,
code:`class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;  // защита от переполнения
            
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;   // ищем в правой половине
            } else {
                right = mid - 1;  // ищем в левой половине
            }
        }
        
        return -1;  // не найдено
    }
}`,
complexity:`Время: O(log n), Память: O(1)`,
complexityExpl:`Классический бинарный поиск: интервал сокращается вдвое — O(log n). Только lo, hi, mid — O(1) памяти.`,
expl:`O(log n) время, O(1) память. На каждом шаге пространство поиска сокращается вдвое.`,
lcSimilar:[{"t":"LeetCode 704. Binary Search","h":"leetcode-704-binary-search"}],
repoSimilar:["bs2"]},

{id:"bs4",t:"Validate BST",p:"Binary Search",d:"средне",
desc:`Дан корень ==бинарного дерева==. Проверить, является ли оно ==валидным (правильным) деревом поиска (BST)==.
Свойства BST:
- Все значения в левом поддереве строго меньше значения узла
- Все значения в правом поддереве строго больше значения узла
- Оба поддерева также должны быть валидными BST

Пример 1:
Ввод: root = [2, 1, 3]
    2
   / \\
  1   3
Вывод: true

Пример 2:
Ввод: root = [5, 1, 4, null, null, 3, 6]
    5
   / \\
  1   4
     / \\
    3   6
Вывод: false (3 < 5, но находится в правом поддереве)

Ограничения:
- Количество узлов: [1, 10⁴]
- -2³¹ ≤ Node.val ≤ 2³¹ - 1`,
hint:`Передавать min/max границы в рекурсию. Значение должно быть строго между min и max.`,
code:`class Solution {
    public boolean isValidBST(TreeNode root) {
        return isValid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean isValid(TreeNode node, long low, long high) {
        if (node == null) return true;

        if (node.val <= low || node.val >= high) {
            return false;
        }

        return isValid(node.left, low, node.val) && isValid(node.right, node.val, high);
    }
}`,
complexity:`Время: O(n), Память: O(h)`,
complexityExpl:`Рекурсия isValid посещает каждый узел один раз — O(n). Стек вызовов по высоте дерева — O(h) памяти.`,
expl:`Рекурсия с границами. Для левого поддерева: max = node.val. Для правого: min = node.val. Используем long чтобы обработать граничные значения Integer.`,
lcSimilar:[{"t":"Validate Binary Search Tree","h":"validate-binary-search-tree"},{"t":"Kth Smallest Element in a BST","h":"kth-smallest-element-in-a-bst"}]},

// ===== GEOMETRY HASH =====
{id:"gh1",t:"LeetCode 356: Line Reflection",p:"Geometry Hash",d:"средне",
desc:`Дан массив точек (x, y). Определить, существует ли ==вертикальная прямая==, относительно которой ==все точки симметричны==.

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
        Set<String> pointSet = new HashSet<>();

        for (int[] p : points) {
            minX = Math.min(minX, p[0]);
            maxX = Math.max(maxX, p[0]);
            pointSet.add(p[0] + "," + p[1]);
        }

        // axis = (minX + maxX) / 2, но умножаем на 2 чтобы не работать с double
        // mirrorX = 2*axis - x = (minX + maxX) - x
        int axisDouble = minX + maxX;

        for (int[] p : points) {
            int mirrorX = axisDouble - p[0];
            if (!pointSet.contains(mirrorX + "," + p[1])) {
                return false;
            }
        }

        return true;
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Первый цикл заполняет HashSet за O(n), второй проверяет зеркало за O(1) на точку. HashSet хранит n ключей — O(n) памяти.`,
expl:`Ось симметрии x = (minX + maxX) / 2. Для каждой точки проверяем наличие зеркальной в HashSet. O(n) время и память.`,
lcSimilar:[{"t":"LeetCode 356","h":"leetcode-356"}]},

{id:"gh2",t:"Строгая симметрия по оси Y",p:"Geometry Hash",d:"средне",
desc:`Дан массив точек points. Нужно вернуть true, если существует такая прямая, параллельная оси Y, которая симметрично отражает все данные точки и false, если такой прямой нет.
ВАЖНО: При этом каждая точка должна иметь симметричную ей точку в массиве с таким же числом вхождений. Если же точка имеет координату X равную оси симметрии, то она симметрична сама себе в любом случае.

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
        
        // Ось симметрии
        int axisSum = minX + maxX;  // 2 * axis, всегда целое число
        
        for (int[] p : points) {
            int mirrorX = axisSum - p[0];  // зеркальная координата X
            String key = p[0] + "," + p[1];
            String mirrorKey = mirrorX + "," + p[1];
            
            // Количество точек должно совпадать с количеством их зеркальных отражений
            if (!countMap.getOrDefault(key, 0).equals(countMap.getOrDefault(mirrorKey, 0))) {
                return false;
            }
        }
        
        return true;
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Два линейных прохода: HashMap кратностей, затем проверка зеркальных пар — O(n). Карта до n ключей — O(n) памяти.`,
expl:`Строгая биекция: количество совпадений точки и её зеркала должно совпадать. Точки на оси допустимы. O(n) время и память.`},

{id:"gh3",t:"LeetCode 356 — Line Reflection",p:"Geometry Hash",d:"средне",
desc:`Дан набор точек на плоскости. Определить, существует ли прямая, параллельная оси Y, которая ==отражает все точки==.

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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один проход для min/max и множества, второй — проверка зеркала через contains — O(n). HashSet — O(n) памяти.`,
expl:`Ось = (minX + maxX) / 2. Вместо деления используем sumAxis = minX + maxX, зеркальная точка: sumAxis - x. Проверяем через HashSet. O(n).`,
lcSimilar:[{"t":"LeetCode 356 — Line Reflection","h":"leetcode-356-line-reflection"}]},

// ===== GRAPH BFS =====
{id:"gbfs1",t:"Кратчайший путь в графе",p:"Graph BFS",d:"средне",
desc:`Дан ==невзвешенный неориентированный граф== в виде списка рёбер edges и две вершины start и end. Расстояния между вершинами равны 1. Найти ==кратчайший путь== от start до end. Вернуть список вершин пути или пустой список, если путь не существует.

Пример 1:
Ввод: edges = [[1,8],[2,1],[5,1],[3,8],[3,5]], start = 2, end = 5
Вывод: [2, 1, 5]
Пояснение: 2→1→5 — кратчайший путь длины 2

Пример 2:
Ввод: edges = [[1,2],[2,3],[3,4]], start = 1, end = 4
Вывод: [1, 2, 3, 4]

Пример 3:
Ввод: edges = [[1,2],[3,4]], start = 1, end = 4
Вывод: [] (нет пути между 1 и 4)

Ограничения:
- Граф невзвешенный, рёбра двунаправленные
- Вершины пронумерованы целыми числами`,
hint:`BFS (поиск в ширину) + карта родителей для восстановления пути. BFS гарантирует кратчайший путь в невзвешенном графе.`,
code:`public class Solution {
    public List<Integer> findShortestPath(
            List<List<Integer>> edges,
            Integer start, Integer end) {

        Map<Integer, List<Integer>> graph = new HashMap<>();
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
            for (int nb : graph.getOrDefault(node, new ArrayList<>())) {
                if (!visited.containsKey(nb)) {
                    visited.put(nb, node);
                    queue.add(nb);
                }
            }
        }

        if (!visited.containsKey(end)) return new ArrayList<>();

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
complexity:`Время: O(V + E), Память: O(V + E)`,
complexityExpl:`BFS помечает каждую вершину и ребро один раз — O(V+E). Граф, очередь и карта родителей — O(V+E) памяти.`,
expl:`BFS гарантирует кратчайший путь в невзвешенном графе. Очередь FIFO обрабатывает сначала ближайших соседей. Восстановление пути через карту родителей с обратным обходом от end к start.`,
lcSimilar:[{"t":"Word Ladder","h":"word-ladder"},{"t":"Shortest Path in Binary Matrix","h":"shortest-path-in-binary-matrix"}]},

// ===== GRAPH TOPOSORT =====
{id:"gts1",t:"Циклические зависимости",p:"Graph Toposort",d:"средне",
desc:`Дан список зависимостей вида [A зависит от B]. Определить, есть ли ==циклическая зависимость==.

Пример:
Ввод: [["A","B"],["B","C"],["C","A"]]
Вывод: true (цикл A→B→C→A)

Ввод: [["A","B"],["B","C"]]
Вывод: false`,
hint:`Топологическая сортировка (алгоритм Кана): считаем in-degree, удаляем вершины с 0 входящих. Если не все обработаны — цикл.`,
code:`class Solution {
    // Алгоритм Кана: топологическая сортировка для обнаружения цикла
    // O(V+E) по времени, O(V+E) по памяти
    public boolean hasCycle(List<List<String>> deps) {
        // Граф: вершина -> список соседей (куда идут ребра)
        Map<String, List<String>> graph = new HashMap<>();
        // Счетчик входящих ребер для каждой вершины
        Map<String, Integer> indegree = new HashMap<>();

        // 1. Строим граф и считаем in-degree
        for (List<String> dep : deps) {
            String from = dep.get(0), to = dep.get(1);
            graph.putIfAbsent(from, new ArrayList<>());
            graph.putIfAbsent(to, new ArrayList<>());
            indegree.putIfAbsent(from, 0);
            indegree.putIfAbsent(to, 0);
            
            graph.get(from).add(to);      // ребро from -> to
            indegree.merge(to, 1, Integer::sum); // увеличиваем in-degree для to
        }

        // 2. Находим все вершины без входящих ребер (стартовые)
        Queue<String> queue = new LinkedList<>();
        for (var entry : indegree.entrySet()) {
            if (entry.getValue() == 0)
                queue.add(entry.getKey());
        }

        // 3. Последовательно удаляем вершины с in-degree = 0
        int processed = 0;
        while (!queue.isEmpty()) {
            String node = queue.poll();
            processed++;
            
            // Уменьшаем in-degree у всех соседей
            for (String nb : graph.getOrDefault(node, new ArrayList<>())) {
                indegree.merge(nb, -1, Integer::sum); // уменьшаем на 1
                if (indegree.get(nb) == 0)
                    queue.add(nb); // новый кандидат на удаление
            }
        }

        // 4. Если обработали не все вершины -> есть цикл
        return processed != indegree.size();
    }
}`,
complexity:`Время: O(V + E), Память: O(V + E)`,
complexityExpl:`Kahn: каждое ребро снимается один раз при уменьшении indegree — O(V+E). Граф, очередь и счётчики — O(V+E) памяти.`,
expl:`Алгоритм Кана: считаем in-degree для каждой вершины, добавляем в очередь вершины с 0 входящих. Удаляем их, уменьшая in-degree соседей. Если не все вершины обработаны — граф содержит цикл. O(V+E).`},

{id:"gts2",t:"LC 207 — Course Schedule",p:"Graph Toposort",d:"средне",
desc:`Всего необходимо пройти numCourses курсов, обозначенных от 0 до numCourses - 1. Дан массив prerequisites, где prerequisites[i] = [ai, bi] означает: чтобы пройти курс ai, ==сначала нужно пройти курс bi==.

Верните ==true, если можно закончить все курсы==. Иначе — false.

Пример 1:
Ввод: numCourses = 2, prerequisites = [[1, 0]]
Вывод: true
Пояснение: сначала курс 0, потом курс 1

Пример 2:
Ввод: numCourses = 2, prerequisites = [[1, 0], [0, 1]]
Вывод: false
Пояснение: цикл 0 → 1 → 0

Ключевое наблюдение: если в графе зависимостей ==нет цикла==, то все курсы можно пройти.`,
hint:`Алгоритм Кана: строим граф (prerequisite → course) и массив indegree. Кладём в очередь курсы с indegree = 0. Снимаем рёбра, уменьшаем indegree соседей. Если обработали все n курсов — цикла нет.`,
code:`class Solution {
    // Алгоритм Кана: можно ли выполнить все курсы (нет цикла в зависимостях)
    public boolean canFinish(int n, int[][] prerequisites) {
        List<Integer>[] adj = new List[n];
        int[] indegree = new int[n];
        
        // 1. Строим граф
        for (int[] pair : prerequisites) {
            int course = pair[0];
            int prereq = pair[1];
            if (adj[prereq] == null) adj[prereq] = new ArrayList<>();
            adj[prereq].add(course);
            indegree[course]++;
        }
        
        // 2. Находим стартовые вершины (нет prerequisite)
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) queue.offer(i);
        }
        
        // 3. Последовательно удаляем вершины с indegree = 0
        int processed = 0;
        while (!queue.isEmpty()) {
            int cur = queue.poll();
            processed++;
            if (adj[cur] != null) {
                for (int next : adj[cur]) {
                    indegree[next]--;
                    if (indegree[next] == 0) queue.offer(next);
                }
            }
        }
        
        // 4. Если обработали все курсы — цикла нет
        return processed == n;
    }
}`,
complexity:`Время: O(V + E), Память: O(V + E)`,
complexityExpl:`Каждая вершина и каждое ребро обрабатываются один раз. Граф, очередь и indegree — O(V+E) памяти.`,
expl:`Задача сводится к поиску цикла в ориентированном графе. Алгоритм Кана: начинаем с курсов без prerequisites (indegree = 0), поочерёдно «снимаем» их и уменьшаем indegree соседей. Если удалось обработать все n курсов — цикла нет → true. Иначе — в графе есть цикл → false.`,
lcSimilar:[{"n":207,"t":"Course Schedule","h":"course-schedule"}]},

{id:"gts3",t:" LC 802 — Find Eventual Safe States.",p:"Graph Toposort",d:"средне",
desc:`Дан ориентированный граф из n узлов (graph[i] — список соседей узла i).
- Терминальный узел — нет исходящих рёбер.
- Безопасный узел — каждый путь из него ведёт в терминальный (или другой безопасный) узел.
Вернуть ==все безопасные узлы, отсортированные по возрастанию==.

Пример:
Ввод: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Вывод: [2,4,5,6]
Пояснение: узлы 5 и 6 терминальные; 2, 4 ведут только к ним.

Ключевое наблюдение: ==безопасный узел — тот, который не находится в цикле и не ведёт в цикл==.`,
hint:`Два подхода:
1. ==DFS с раскраской==: 0=UNVISITED, 1=VISITING (цикл!), 2=DONE. Если сосед в состоянии VISITING — нашли цикл, узел небезопасен.
2. ==Алгоритм Кана на обратном графе==: строим reverse-граф и массив outdegree. Начинаем с терминальных (outdegree=0). Уменьшаем outdegree родителей — если стал 0, тоже безопасен.`,
code:`class Solution {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        List<List<Integer>> reverse = new ArrayList<>();
        for (int i = 0; i < n; i++)
            reverse.add(new ArrayList<>());
        int[] outdegree = new int[n];

        // 1. Обратный граф + outdegree
        for (int u = 0; u < n; u++) {
            outdegree[u] = graph[u].length;
            for (int v : graph[u])
                reverse.get(v).add(u);
        }

        // 2. Терминальные вершины в очередь
        Queue<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < n; i++)
            if (outdegree[i] == 0) q.offer(i);

        boolean[] safe = new boolean[n];

        // 3. BFS (Kahn на обратном графе)
        while (!q.isEmpty()) {
            int node = q.poll();
            safe[node] = true;
            for (int parent : reverse.get(node))
                if (--outdegree[parent] == 0)
                    q.offer(parent);
        }

        // 4. Собираем ответ
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++)
            if (safe[i]) res.add(i);
        return res;
    }
}`,
code2:`// DFS с раскраской (альтернативный подход)
class Solution {
    private static final int UNVISITED = 0;
    private static final int VISITING  = 1; // в цикле!
    private static final int DONE      = 2;

    public List<Integer> eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        int[] state = new int[n];
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++)
            if (!hasCycle(graph, state, i))
                res.add(i);
        return res;
    }

    private boolean hasCycle(int[][] graph,
                              int[] state, int node) {
        if (state[node] == VISITING) return true;
        if (state[node] == DONE)     return false;
        state[node] = VISITING;
        for (int nb : graph[node])
            if (hasCycle(graph, state, nb)) return true;
        state[node] = DONE;
        return false;
    }
}`,
complexity:`Время: O(V + E), Память: O(V + E)`,
complexityExpl:`Оба подхода обходят каждую вершину и ребро один раз — O(V+E). Обратный граф и массивы — O(V+E) памяти.`,
expl:`Безопасные узлы = не участвующие в цикле и не ведущие в цикл. Алгоритм Кана на обратном графе: терминальные (outdegree=0) безопасны; убираем их рёбра, уменьшаем outdegree родителей — все достигшие 0 тоже безопасны. Альтернатива — DFS с 3 состояниями: VISITING при повторном заходе означает цикл.`,
lcSimilar:[{"n":802,"t":"Find Eventual Safe States","h":"find-eventual-safe-states"}]},

// ===== GREEDY =====
{id:"gop1",t:"LeetCode 122. Best Time to Buy and Sell Stock II",p:"Greedy",d:"легко",
desc:`Дан массив prices, где prices[i] — цена акции в день i.
Можно совершать несколько транзакций (покупку и продажу):
- Покупать и продавать в любой день
- Не более одной акции одновременно
- Можно покупать и продавать в один день

Найти ==максимальную прибыль==.

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один цикл по ценам — O(n). Только totalProfit и счётчик — O(1) памяти.`,
expl:`Сумма всех маленьких ростов = максимальная прибыль`,
lcSimilar:[{"t":"Best Time to Buy and Sell Stock II","h":"best-time-to-buy-and-sell-stock-ii"},{"t":"Best Time to Buy and Sell Stock","h":"best-time-to-buy-and-sell-stock"}]},

{id:"gop2",t:"763 Partition Labels",p:"Greedy",d:"средне",
desc:`==Разбить строку на максимальное количество частей== так, чтобы ==каждая буква встречалась не более чем в одной части==. Вернуть размеры частей.

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

        //partitionStart — где начался текущий кусок
        //maxReach — насколько далеко должен дойти текущий кусок
        int partitionStart = 0;
        int maxReach = 0;

        for (int i = 0; i < s.length(); i++) {
            maxReach = Math.max(maxReach, lastOccurrence[s.charAt(i) - 'a']);
            if (i == maxReach) { //все символы, которые мы встретили в текущем куске, больше не встречаются дальше
                result.add(i - partitionStart + 1);
                partitionStart = i + 1;
            }
        }

        return result;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Два прохода: заполнение lastOccurrence[26] и проход по строке — O(n). Массив из 26 целых — O(1) памяти.`,
expl:`Заметим, что сами части могут быть мелкими, главное чтоб их было как можно больше. 
Для каждого символа запоминаем его последнюю позицию. 
Для каждого пройденного символа есть его максимальная позиция справа. Вот через Math.max мы ее узнаем. И когда текущая позиция равна этой максимальной - значит для всех пройденных символов дальше они не попадутся и это максимальная длина подоторезка`,
lcSimilar:[{"t":"Partition Labels","h":"partition-labels"},{"t":"Merge Intervals","h":"merge-intervals"}]},

{id:"gop3",t:"Разбиение на 3 части",p:"Greedy",d:"легко",
desc:`Дан массив. Разбить его на 3 непустые части. Вернуть ==минимальную сумму== первых элементов каждой части.

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход с обновлением двух минимумов — O(n). Только переменные — O(1) памяти.`,
expl:`Первый элемент всегда начинает первую часть. Из позиций 1..n-1 выбираем два минимальных — это начала второй и третьей частей. O(n).`},

{id:"gop4",t:"Подотрезок с минимумом X",p:"Greedy",d:"средне",
desc:`Найти ==самый длинный подотрезок== массива, в котором минимум равен x. Вернуть длину подотрезка.

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один цикл со скользящим окном, каждый индекс обрабатывается константное число раз — O(n). Переменные — O(1).`,
expl:`Все элементы в окне должны быть >= x, и хотя бы один == x. Элементы < x разрывают окно. Сдвигаем left и сбрасываем hasTarget. O(n).`,
lcSimilar:[{"t":"Best Time to Buy and Sell Stock II","h":"best-time-to-buy-and-sell-stock-ii"},{"t":"Best Time to Buy and Sell Stock","h":"best-time-to-buy-and-sell-stock"}],
diagram:{"type":"window","data":[2,3,1,5,4,2],"steps":[{"wl":1,"wr":1,"desc":"Ищем min ≥ 3. [3] ✓ длина=1"},{"wl":3,"wr":4,"desc":"[5,4] min=4 ≥ 3 ✓ длина=2"},{"wl":3,"wr":4,"desc":"Ответ: макс длина = 2"}]}},

{id:"gop5",t:"LC 3105 Longest Strictly Increasing or Strictly Decreasing Subarray",p:"Greedy",d:"легко",
desc:`Найти самый длинный ==строго монотонный== (возрастающий или убывающий) подотрезок. Вернуть [start, end].

Пример:
Ввод: [2, 7, 5, 4, 4, 3]
Вывод: [1, 3] (подотрезок [7, 5, 4] — строго убывающий, длина 3)`,
hint:`Отслеживать длину возрастающей и убывающей подпоследовательности. Сбрасывать при смене направления или равных элементах.`,
code:`import java.util.*;

class Solution {
    public static List<Integer> searchMonoton(List<Integer> nums) {
        int maxLen = 1, incLen = 1, decLen = 1;
        List<Integer> result = Arrays.asList(0, 0);

        for (int idx = 1; idx < nums.size(); idx++) {
            if (nums.get(idx - 1) < nums.get(idx)) {
                incLen++;
                decLen = 1;
            } else if (nums.get(idx - 1) > nums.get(idx)) {
                decLen++;
                incLen = 1;
            } else {
                incLen = 1;
                decLen = 1;
            }

            int currLen = Math.max(incLen, decLen);
            if (currLen > maxLen) {
                result = Arrays.asList(idx - currLen + 1, idx);
                maxLen = currLen;
            }
        }

        return result;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход с обновлением счётчиков incLen/decLen — O(n). Несколько целых — O(1) памяти.`,
expl:`Ведём два счётчика: incLen и decLen. При смене направления или равных элементах сбрасываем. Запоминаем лучший результат. O(n).`,
lcSimilar:[{"t":"LC 3105 · Longest Strictly Increasing or Strictly Decreasing Subarray","h":"lc-3105-longest-strictly-increasing-or-strictly-decreasing-subarray"}]},

{id:"gop6",t:"Расстояние между X и Y",p:"Greedy",d:"средне",
desc:`Дана строка из символов X, Y и O. Найти ==кратчайшее расстояние== между X и Y.

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один цикл по строке с обновлением lastX/lastY — O(n). Несколько индексов — O(1) памяти.`,
expl:`Минимальное расстояние всегда достигается парой соседних X и Y по позиции. Один проход, обновляем lastX/lastY и result. O(n).`},

{id:"gop7",t:"Половины с разницей ≤ k",p:"Greedy",d:"средне",
desc:`Дан массив целых чисел nums чётной длины 2*n и неотрицательное число k. Нужно переставить элементы массива так, чтобы в обеих половинах массива для всех пар индексов i, j выполнялось неравенство |nums[i] - nums[j]| <= k (попарная разница элементов в обеих половинах массива была не больше чем k). Если подходящих перестановок несколько, можно вернуть любую. Если перестановка невозможна, вернуть пустой массив.
Или, что то же самое: max(половины) - min(половины) ≤ k.

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
complexity:`Время: O(n log n), Память: O(n)`,
complexityExpl:`Arrays.sort — O(n log n), затем линейное распределение по группам. Три списка суммарно n элементов — O(n) памяти.`,
expl:`Сортируем массив. Распределяем по группам: близкие к min, близкие к max, и промежуточные. Каждая половина отсортированного массива автоматически удовлетворяет условию разницы ≤ k.`},

{id:"gop8",t:"Оптимизация маршрута",p:"Greedy",d:"средне",
desc:`Дан путь из команд U/D/L/R (вверх/вниз/лево/право). ==Удалить все петли== (когда возвращаемся в уже посещённую точку).

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
                    int[] last = coords.get(coords.size() - 1);
                    String lastKey = last[0] + "," + last[1];
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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Каждый добавленный шаг может быть удалён не более одного раза — амортизированно O(n). coords, visited, result — O(n) памяти.`,
expl:`Отслеживаем посещённые точки. При повторном посещении разматываем путь (удаляем координаты и команды) до точки совпадения — это и есть петля. O(n) амортизировано.`},

{id:"gop9",t:"Maximize Distance to Closest Person",p:"Greedy",d:"средне",
desc:`Дан массив seats из 0 и 1, где 1 — занятое место. Найти ==максимальное расстояние до ближайшего== занятого места, если сесть на ==оптимальное свободное==.

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один линейный проход по seats — O(n). Константные переменные — O(1) памяти.`,
expl:`O(n) один проход. Три случая: начальные нули (расстояние = позиция первой 1), промежуток между двумя 1 (расстояние = gap/2), конечные нули (расстояние = n-1-lastOne).`},

// ===== HASHMAP =====
{id:"hf1",t:"Group Anagrams",p:"HashMap",d:"средне",
desc:`Дан массив строк strs. ==Сгруппировать все анаграммы== вместе.
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
complexity:`Время: O(n·L), Память: O(n·L)`,
complexityExpl:`Для каждой строки считаем частоты за O(длина) — суммарно O(n·L). HashMap хранит группы и строки — O(n·L) памяти.`,
expl:`O(n × k) время, O(n × k) память, где k — максимальная длина строки. Все анаграммы дают одинаковый частотный ключ.`,
lcSimilar:[{"t":"Group Anagrams","h":"group-anagrams"},{"t":"Valid Anagram","h":"valid-anagram"}],
diagram:{"type":"array","data":["eat","tea","tan","ate","nat","bat"],"steps":[{"active":[0],"labels":{},"desc":"eat → ключ a1e1t1"},{"active":[1],"labels":{},"desc":"tea → тот же ключ! Группа 1"},{"active":[2],"labels":{},"desc":"tan → новый ключ. Группа 2"},{"active":[3],"labels":{},"desc":"ate → как eat. Группа 1"},{"active":[5],"labels":{},"desc":"bat → Группа 3"},{"active":[],"labels":{},"desc":"[[eat,tea,ate],[tan,nat],[bat]]"}]}},

{id:"hf2",t:"Слово-анаграмма",p:"HashMap",d:"легко",
desc:`Проверить, является ли строка t ==анаграммой== строки s.

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход по символам с инкрементами в count[26] — O(n). Массив из 26 элементов — O(1) памяти.`,
expl:`Частотный подсчёт. Если все счётчики равны нулю — строки являются анаграммами. O(n) время, O(1) память.`,
lcSimilar:[{"t":"Valid Anagram","h":"valid-anagram"},{"t":"Find All Anagrams in a String","h":"find-all-anagrams-in-a-string"}]},

{id:"hf3",t:"205 Isomorphic Strings",p:"HashMap",d:"средне",
desc:`Проверить, являются ли строки s и t ==изоморфными==. Каждый символ s можно заменить на символ t с сохранением порядка. ==Биекция==: разные символы не могут отображаться в один.

Пример:
Ввод: s = "egg", t = "add"
Вывод: true (e→a, g→d)

Ввод: s = "foo", t = "bar"
Вывод: false (o→a и o→r — конфликт)`,
hint:`Две карты: s→t и t→s для обеспечения биекции. Конфликт в любой — не изоморфны.`,
code:`class Solution {
    public boolean isIsomorphic(String s, String t) {
        int[] lastSeenS = new int[256];
        int[] lastSeenT = new int[256];
        for (int i = 0; i < s.length(); i++) {
            if (lastSeenS[s.charAt(i)] != lastSeenT[t.charAt(i)]) {
                return false;
            }

            lastSeenS[s.charAt(i)] = i + 1;  // +1 чтобы 0 означал "не видели"
            lastSeenT[t.charAt(i)] = i + 1;
        }
        return true;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один цикл по позициям строки с проверкой пар в массивах — O(n). Два массива на 256 целых — O(1) памяти.`,
expl:`Первая мысль — изоморфизм это биекция. Каждый символ из s должен однозначно отображаться в символ из t, и обратно. Значит нужно хранить два маппинга: s→t и t→s.
Наивно — две HashMap. Но символы это просто числа от 0 до 255, поэтому HashMap избыточен — заменяем на два массива размера 256. Это O(1) память по факту, константа.
Теперь вопрос как хранить. Первая идея — хранить сам символ в который отображаемся, заполнить массивы -1 как sentinel. Но тут я подумал: а зачем хранить символ? Достаточно хранить когда последний раз видели каждый символ. Если s[i] и t[i] оба встречались впервые — окей, запоминаем. Если оба встречались раньше — они должны были встретиться на одном и том же шаге, иначе маппинг конфликтует.
Это одна проверка вместо двух, и Arrays.fill не нужен — массивы инициализируются нулями, а мы пишем i+1 чтобы отличить "не видели" от "видели на шаге 0".
Итого: один проход O(n), два массива O(1), никаких вспомогательных структур.`,
lcSimilar:[{"t":"205. Isomorphic Strings","h":"205-isomorphic-strings"}]},

{id:"hf4",t:"Удаление лишних дубликатов",p:"HashMap",d:"легко",
desc:`Дан массив и число n. Оставить ==не более n вхождений== каждого элемента.

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
complexity:`Время: O(n), Память: O(u)`,
complexityExpl:`Один проход по массиву с O(1) операциями HashMap на элемент — O(n). Карта до u различных ключей — O(u) памяти.`,
expl:`Хотим оставить не более n копий каждого элемента. Один проход по arr: смотрим count[val] — сколько раз этот элемент уже добавлен. Если count < n — добавляем в результат и увеличиваем счётчик. Иначе — пропускаем. O(n) время и память.`},

{id:"hf5",t:"Перестановка букв и палиндром",p:"HashMap",d:"средне",
desc:`Можно ли ==переставить символы== строки так, чтобы получился ==палиндром==?

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Цикл по строке считает частоты за O(n), затем 26 проверок. Массив count[26] — O(1) памяти.`,
expl:`Цикл по строке считает частоту каждого символа (массив count[26]). Затем считаем количество символов с нечётной частотой (oddCount). Палиндром допускает максимум один такой символ (центр строки нечётной длины) → если oddCount ≤ 1, вернуть true. O(n) время, O(1) память.`},

{id:"hf6",t:"Маршрут туриста",p:"HashMap",d:"средне",
desc:`Даны авиабилеты в виде пар [откуда, куда]. ==Восстановить маршрут==.

Пример:
Ввод: [["Moscow","Yerevan"],["Vladivostok","Moscow"]]
Вывод: ["Vladivostok", "Moscow", "Yerevan"]`,
hint:`Начальный город — тот, которого нет во множестве городов назначения. Далее следуем по цепочке через HashMap.`,
code:`class Solution {
    public List<String> reconstructRoute(String[][] tickets) {
        // Шаг 1: хранилище всех пунктов назначения
        Set<String> destinations = new HashSet<>();
        
        // Шаг 2: маппинг "откуда → куда"
        Map<String, String> mapping = new HashMap<>();

        // Заполняем структуры
        for (String[] ticket : tickets) {
            mapping.put(ticket[0], ticket[1]);  // откуда → куда
            destinations.add(ticket[1]);        // запоминаем все пункты назначения
        }

        // Шаг 3: находим стартовую точку
        // Ищем город, который есть в "откуда", но НЕТ в "куда"
        String start = null;
        for (String[] ticket : tickets) {
            if (!destinations.contains(ticket[0])) {
                start = ticket[0];
                break;
            }
        }

        // Шаг 4: восстанавливаем маршрут
        List<String> route = new ArrayList<>();
        String current = start;
        while (current != null) {
            route.add(current);
            current = mapping.get(current);  // переходим к следующему городу
        }

        return route;
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Два прохода по билетам + цикл по цепочке — O(n). HashMap, HashSet и список маршрута — O(n) памяти.`,
expl:`Наблюдение 1: каждый билет [from, to] — стрелка из города в город. Значит, можно построить HashMap from→to и маршрут — это просто цепочка переходов по этой карте.
Наблюдение 2: откуда начинать? Начальный город никогда не является чьим-то пунктом назначения. Собираем все города-назначения в HashSet и ищем тот город из "откуда", которого в этом сете нет.
Алгоритм: 1) проходим по билетам — заполняем mapping и destinations; 2) ищем start — город из "откуда", которого нет в destinations; 3) идём по цепочке: route.add(current), current = mapping.get(current), пока current != null. O(n) время и память.`},

// ===== HEAP / PQ =====
{id:"hpq1",t:"LeetCode 347 Top K Frequent Elements",p:"Heap / PQ",d:"средне",
desc:`Дан массив целых чисел nums и число k. Вернуть ==k наиболее часто встречающихся== элементов. Гарантируется, что ответ уникален. Ответ можно вернуть в любом порядке.

Пример 1:
Ввод: nums = [1,1,1,2,2,3], k = 2
Вывод: [1, 2]
Пояснение: элемент 1 — 3 раза, 2 — 2 раза, 3 — 1 раз

Пример 2:
Ввод: nums = [1], k = 1
Вывод: [1]

Пример 3:
Ввод: nums = [4,4,4,6,6,2,2,2,1], k = 2
Вывод: [4, 2]

Ограничения:
- 1 ≤ nums.length ≤ 10⁵
- -10⁴ ≤ nums[i] ≤ 10⁴
- k ∈ [1, количество уникальных элементов]
- Требуемая сложность лучше O(n log n)`,
hint:`Считаем частоту через HashMap, затем min-heap размера k. Если размер > k — удаляем минимальный.`,
code:`class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : nums) {
            frequencyMap.merge(num, 1, Integer::sum);
        }

        PriorityQueue<Map.Entry<Integer, Integer>> minHeap = new PriorityQueue<>(
                Comparator.comparingInt(Map.Entry::getValue));

        for (Map.Entry<Integer, Integer> entry : frequencyMap.entrySet()) {
            minHeap.offer(entry);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

       int[] result = new int[k];
       for (int i = k - 1; i >= 0; i--) {
           result[i] = minHeap.poll().getKey();
       }
       return result;
    }
}`,
complexity:`Время: O(n log k), Память: O(n + k)`,
complexityExpl:`Подсчёт частот O(n), затем для каждого элемента push/pop в min-heap размера k — O(log k). Итого O(n log k). Карта O(n), куча O(k).`,
expl:`Шаг 1: один проход по nums — считаем частоты в HashMap. Шаг 2: для каждой пары (элемент, частота) добавляем в min-heap (отсортирован по частоте). Если размер кучи > k — удаляем минимальный элемент. В итоге в куче остаются ровно k самых частых. O(n log k) время, O(n + k) память.`},

{id:"hpq2",t:"Top K Frequent Words",p:"Heap / PQ",d:"средне",
desc:`Дан массив строк words и число k. Найти ==k самых частых слов==. При равной частоте — лексикографический порядок.

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
complexity:`Время: O(n log k), Память: O(n + k)`,
complexityExpl:`Частоты слов O(n), затем операции с кучей размера k — O(n log k). freqMap O(n), куча O(k).`,
expl:`Шаг 1: один проход по words — считаем частоты в HashMap. Шаг 2: min-heap с компаратором: наверху — наименее частое слово, при равной частоте — лексикографически большее (чтобы первыми вытеснять «худшие»). Если размер > k — poll(). При сборе результата переворачиваем список. O(n log k) время.`},

{id:"hpq3",t:"LC 215 · Kth Largest Element in an Array",p:"Heap / PQ",d:"средне",
desc:`Дан массив nums и число k. Найти k-й по величине элемент (не k-й уникальный).

Примеры:
nums = [3,2,1,5,6,4], k = 2 → 5
nums = [3,2,3,1,2,4,5,5,1], k = 4 → 4`,
hint:`Min-heap размера k: держим k наибольших элементов, вершина кучи — это k-й по величине.`,
code:`class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        return minHeap.peek();
    }
}`,
complexity:`Время: O(n log k), Память: O(k)`,
complexityExpl:`Для каждого элемента делаем вставку в кучу и иногда удаление минимума, обе операции O(log k). Размер кучи ограничен k.`,
expl:`k-й по величине — это минимум из k наибольших элементов. Инвариант: min-heap всегда хранит ровно k наибольших из просмотренных. Для каждого num: добавляем в кучу, если size > k — poll() (выталкиваем наименьший). В конце peek() — это и есть k-й по величине. O(n log k) время, O(k) память.`,
lcSimilar:[{"n":215,"t":"Kth Largest Element in an Array","h":"kth-largest-element-in-an-array"}],
repoSimilar:["hpq1"]},

// ===== INTERVALS SWEEP =====
{id:"iss1",t:"Merge Intervals",p:"Intervals Sweep",d:"средне",
desc:`Дан список отрезков [начало, конец]. Необходимо ==объединить все пересекающиеся отрезки==.

Примеры:
- [1,3] и [2,6] перекрываются → [1,6]
- [1,4] и [4,5] перекрываются (общая точка 4) → [1,5]
- [1,2] и [3,4] не перекрываются

Ввод: [[1,3],[2,6],[8,10],[15,18]]
Вывод: [[1,6],[8,10],[15,18]]`,
hint:`Сортируем по началу. Идём слева направо, расширяем текущий интервал или начинаем новый.`,
code:`class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));

        List<int[]> merged = new ArrayList<>();

        int currentStart = intervals[0][0];
        int currentEnd   = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            int nextStart = intervals[i][0];
            int nextEnd   = intervals[i][1];

            if (currentEnd < nextStart) {
                merged.add(new int[]{currentStart, currentEnd});
                currentStart = nextStart;
                currentEnd   = nextEnd;
            } else {
                currentEnd = Math.max(currentEnd, nextEnd);
            }
        }

        merged.add(new int[]{currentStart, currentEnd});
        return merged.toArray(new int[merged.size()][]);
    }
}`,
complexity:`Время: O(n log n), Память: O(n)`,
complexityExpl:`Сортировка по началу — O(n log n), затем линейный проход слияния. Список merged до n отрезков — O(n) памяти.`,
expl:`Сортируем интервалы по началу. Берём первый как текущий (curStart, curEnd). Для каждого следующего: если его начало > curEnd — пересечения нет, добавляем текущий в результат и начинаем новый. Иначе расширяем: curEnd = max(curEnd, nextEnd). В конце добавляем последний текущий. O(n log n).`},

{id:"iss2",t:"Пересекающиеся отрезки",p:"Intervals Sweep",d:"средне",
desc:`Найти все отрезки, которые ==пересекаются хотя бы с одним другим==.

Пример:
Ввод: [[6,8],[1,5],[4,7]]
Вывод: [[1,5],[4,7],[6,8]] (все три пересекаются)`,
hint:`Сортируем по началу. Отслеживаем bestEnd — максимальный конец среди предыдущих. Если текущий start ≤ bestEnd — пересечение.`,
code:`import java.util.*;

public class Solution {
    private static boolean isOverlapping(List<Integer> a, List<Integer> b) {
        // Проверяет, пересекаются ли два отрезка
        return Math.max(a.get(0), b.get(0)) <= Math.min(a.get(1), b.get(1));
    }

    public static List<List<Integer>> findOverlappings(List<List<Integer>> segments) {
        segments.sort(Comparator.comparingInt((List<Integer> x) -> x.get(0)).thenComparingInt(x -> x.get(1)));
        Set<List<Integer>> result = new HashSet<>();
        int maxEndIndex = 0;

        for (int i = 1; i < segments.size(); i++) {
            if (isOverlapping(segments.get(i), segments.get(maxEndIndex))) {
                result.add(segments.get(i));
                result.add(segments.get(maxEndIndex));
            }
            if (segments.get(i).get(1) > segments.get(maxEndIndex).get(1)) {
                maxEndIndex = i;
            }
        }

        return new ArrayList<>(result);
    }
}`,
complexity:`Время: O(n log n), Память: O(n)`,
complexityExpl:`Сортировка индексов — O(n log n), линейный проход с массивом флагов — O(n). Массив idx и boolean[] — O(n) памяти.`,
expl:`Задача про пересечение отрезков естественно решается после СОРТИРОВКИ по началу.
После сортировки проверяем: если текущий start ≤ предыдущий bestEnd, оба отрезка пересекаются. Помечаем флагами.`},

{id:"iss3",t:"Слияние отрезков",p:"Intervals Sweep",d:"средне",
desc:`==Объединить пересекающиеся отрезки== (аналог Merge Intervals, но с вспомогательными функциями isOverlapping и mergeTwoSegments).

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
        Arrays.sort(segments, Comparator.comparingInt(a -> a[0]));

        List<int[]> result = new ArrayList<>();
        int[] current = segments[0];
        for (int i = 1; i < segments.length; i++) {
            if (isOverlapping(current, segments[i])) {
                current = mergeTwoSegments(current, segments[i]);
            } else {
                result.add(current);
                current = segments[i];
            }
        }

        result.add(current);
        return result;
    }
}`,
complexity:`Время: O(n log n), Память: O(n)`,
complexityExpl:`Сортировка — O(n log n), один проход слияния — O(n). Результат до n отрезков — O(n) памяти.`,
expl:`Сортируем по началу. Для каждого следующего отрезка проверяем пересечение с текущим. Если пересекаются — объединяем, иначе — начинаем новый. O(n log n).`},

{id:"iss4",t:"Car Pooling",p:"Intervals Sweep",d:"средне",
desc:`Автомобиль с ==вместимостью capacity==. Список поездок ==[passengers, from, to]==. Можно ли выполнить все поездки?

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
complexity:`Время: O(n + U), Память: O(U)`,
complexityExpl:`Один проход по trips для массива разностей длины U — O(n+U). Массив passengerChanges — O(U) памяти.`,
expl:`Вместо того чтобы следить за каждой поездкой отдельно, используем разностный массив: на остановке from люди садятся (+passengers), на to — выходят (-passengers). Затем один проход — префиксная сумма: текущая загрузка = накопленная сумма изменений. Если в любой точке > capacity → false. O(n + maxLocation) время, O(1) доп. память.`},

{id:"iss5",t:"Meeting Rooms II",p:"Intervals Sweep",d:"средне",
desc:`Дан список ==интервалов совещаний==. Найти ==минимальное количество переговорных комнат==.

Пример:
Ввод: [[0,30],[5,10],[15,20]]
Вывод: 2

Ввод: [[7,10],[2,4]]
Вывод: 1`,
hint:`Разделить на массивы starts и ends. Отсортировать оба. Два указателя: если start < end — нужна комната, иначе — освобождаем.`,
code:`public int minMeetingRooms(int[][] intervals) {
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
    int start = 0, end = 0;
    while (start < n) {
        if (starts[start] >= ends[end]) {
            rooms--;
            end++;
        } else {
            rooms++;
        }
        start++;
        maxRooms = Math.max(maxRooms, rooms);
    }
    return maxRooms;
}`,
complexity:`Время: O(n log n), Память: O(n)`,
complexityExpl:`Сортировка двух массивов starts/ends — O(n log n). Два указателя — O(n). Два массива — O(n) памяти.`,
expl:`Ключевой вопрос: нужна ли новая комната или можно занять освободившуюся? Нам не важно КАКАЯ встреча заканчивается — важно лишь: закончилась ли хоть одна к моменту starts[i]? Сортируем starts и ends по отдельности. Два указателя: если starts[i] >= ends[j] — одна встреча уже закончилась, комнату переиспользуем (rooms--, j++). Иначе — нужна новая (rooms++). Запоминаем максимум. O(n log n).`},

// ===== LINKED LIST =====
{id:"ll1",t:"LC 206 · Reverse Linked List",p:"Linked List",d:"легко",
desc:`Дан head ==односвязного списка==. ==Перевернуть список== и вернуть его новый head.

Пример 1:
Ввод: head = [1, 2, 3, 4, 5]
Вывод: [5, 4, 3, 2, 1]

Пример 2:
Ввод: head = [1, 2]
Вывод: [2, 1]

Пример 3:
Ввод: head = []
Вывод: []

Ограничения:
- Количество узлов: [0, 5000]
- -5000 ≤ Node.val ≤ 5000`,
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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход по списку с перестановкой next — O(n). Три указателя — O(1) памяти.`,
expl:`Три указателя: prev = null, curr = head. Цикл: сохраняем next = curr.next, разворачиваем curr.next = prev, затем сдвигаем: prev = curr, curr = next. Когда curr == null — prev указывает на новый head. O(n) время, O(1) память.`},

{id:"ll2",t:"Удалите N-й узел с конца",p:"Linked List",d:"средне",
desc:`Дан связный список. ==Удалить n-й узел с конца==. Вернуть head.

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`fast уходит на n+1 шагов, затем оба идут до конца — O(n). Константные указатели — O(1) памяти.`,
expl:`Нам нужно остановиться на узле ПЕРЕД удаляемым, чтобы изменить .next. Значит, fast должен опережать slow на n+1 (не n). Оба стартуют с dummy. Сначала продвигаем fast на n+1 шагов. Затем двигаем оба вместе, пока fast != null — тогда slow стоит ровно перед удаляемым. slow.next = slow.next.next. Dummy снимает крайний случай удаления head. O(n) время, O(1) память.`,
lcSimilar:[{"t":"Find First and Last Position of Element in Sorted Array","h":"find-first-and-last-position-of-element-in-sorted-array"},{"t":"Binary Search","h":"binary-search"}],
diagram:{"type":"twoptr","data":["D",1,2,3,4,5,"∅"],"steps":[{"l":0,"r":0,"desc":"dummy→1→2→3→4→5, n=2"},{"l":0,"r":3,"desc":"fast на n+1=3 шага вперёд"},{"l":2,"r":5,"desc":"Двигаем оба..."},{"l":3,"r":6,"desc":"fast=null, slow перед 4"},{"l":3,"r":6,"found":[4],"desc":"Удаляем 4 ✓"}]}},

// ===== MATH / SIMULATION =====
{id:"ms1",t:"Умножение длинного числа",p:"Math / Simulation",d:"средне",
desc:`Число хранится как ==массив цифр в обратном порядке==. Умножить его на цифру n (1-9). Вернуть результат в том же формате.

Пример:
Ввод: [3, 2, 1] × 2 (число 123 × 2)
Вывод: [6, 4, 2] (число 246)

Ввод: [5, 9] × 3 (число 95 × 3)
Вывод: [5, 8, 2] (число 285)`,
hint:`Поцифровое умножение с переносом (carry). Как умножение столбиком.`,
code:`
class Solution {
    public List<Integer> multiplyByDigit(List<Integer> num, int n) {
        List<Integer> result = new ArrayList<>();
        int carry = 0;
        for (int digit : num) {
            int product = digit * n + carry;
            result.add(product % 10);
            carry = product / 10;
        }
        if (carry > 0) {
            result.add(carry);
        }
        return result;
    }
}
`,
complexity:`Время: O(m), Память: O(m)`,
complexityExpl:`Один цикл по m цифрам с carry — O(m). Список result до m+1 цифр — O(m) памяти.`,
expl:`Умножение столбиком: цифра × n + carry. Остаток от 10 — текущая цифра, целая часть — перенос. O(n) время.`},

{id:"ms2",t:"Сумма hex чисел",p:"Math / Simulation",d:"легко",
desc:`Сложить два ==шестнадцатеричных числа==, представленных строками. Вернуть результат как hex-строку.

Пример:
Ввод: "a" + "5"
Вывод: "f" (10 + 5 = 15)

Ввод: "1a" + "f"
Вывод: "29" (26 + 15 = 41)`,
hint:`Сложение справа налево с переносом в системе счисления 16.`,
code:`public String addHex(String a, String b) {
    // Обработка null и пустых строк
    if (a == null) a = "";
    if (b == null) b = "";
    
    int i = a.length() - 1;
    int j = b.length() - 1;
    int carry = 0;
    StringBuilder result = new StringBuilder();
    
    while (i >= 0 || j >= 0 || carry > 0) {
        int sum = carry 
        + (p1 >= 0 ? hexToInt(a.charAt(p1--)) : 0)
        + (p2 >= 0 ? hexToInt(b.charAt(p2--)) : 0);
        result.append(intToHex(sum % 16));
        carry = sum / 16;
    }
    
    // Результат получился в обратном порядке, переворачиваем
    return result.reverse().toString();
}

private int hexToInt(char c) {
    if (c >= '0' && c <= '9') return c - '0';
    if (c >= 'a' && c <= 'f') return c - 'a' + 10;
    if (c >= 'A' && c <= 'F') return c - 'A' + 10;
    throw new IllegalArgumentException("Invalid hex char: " + c);
}

private char intToHex(int n) {
    if (n >= 0 && n <= 9) return (char) (n + '0');
    if (n >= 10 && n <= 15) return (char) (n - 10 + 'a');
    throw new IllegalArgumentException("Invalid hex digit: " + n);
}`,
code2:`class Solution {

    public String addHex(String a, String b) {
        StringBuilder result = new StringBuilder();
        int p1 = a.length() - 1;
        int p2 = b.length() - 1;
        int carry = 0;
        
        while (p1 >= 0 || p2 >= 0 || carry > 0) {
            int sum = carry;
            if (p1 >= 0) sum += hexToInt(a.charAt(p1--));
            if (p2 >= 0) sum += hexToInt(b.charAt(p2--));
            
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
complexity:`Время: O(max(|a|, |b|)), Память: O(max(|a|, |b|))`,
complexityExpl:`Один проход с конца строк с carry — O(max(|a|,|b|)). StringBuilder длины результата — O(max(|a|,|b|)) памяти.`,
expl:`Аналогично десятичному сложению, но в системе 16. Справа налево: складываем цифры + carry. Остаток от 16 — цифра, целая часть — перенос. O(max(a,b)).`},

{id:"ms3",t:"Минимальное произведение",p:"Math / Simulation",d:"легко",
desc:`Найти ==минимальное произведение== двух элементов массива.

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход с обновлением двух min и двух max — O(n). Только переменные — O(1) памяти.`,
expl:`Минимальное произведение пары — один из трёх кандидатов: min1*min2 (два наименьших, оба отрицательных → положительный), min1*max1 (наименьшее × наибольшее → наибольшее по модулю отрицательное), max1*max2 (два наибольших положительных). За один проход находим min1, min2 и max1, max2. Ответ = min(candidate1, candidate2, candidate3).`},

{id:"ms4",t:"Индекс Хирша",p:"Math / Simulation",d:"сложно",
desc:`Дан массив цитирований. Найти ==h-индекс==: максимальное h, при котором ==h статей имеют ≥ h цитирований==.

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
        //Идем с конца к началу, накапливая количество статей
        for (int i = n; i >= 0; i--) {
            count += buckets[i];
            if (count >= i) {
                return i;
            }
        }

        return 0;
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один проход для buckets размера n+1, второй — накопление справа — O(n). Массив buckets — O(n) памяти.`,
expl:`O(n) с bucket sort. Создаём buckets[0..n], где buckets[i] = количество статей с i цитированиями (или >= n). Суммируем справа налево: когда count >= i, нашли h-индекс.`,
lcSimilar:[{"t":"Find First and Last Position of Element in Sorted Array","h":"find-first-and-last-position-of-element-in-sorted-array"},{"t":"Binary Search","h":"binary-search"}],
diagram:{"type":"array","data":[6,5,3,1,0],"steps":[{"active":[],"labels":{},"desc":"Сортируем: [6,5,3,1,0]"},{"active":[0],"labels":{"1":0},"desc":"i=1: 6≥1 ✓"},{"active":[1],"labels":{"2":1},"desc":"i=2: 5≥2 ✓"},{"active":[2],"labels":{"3":2},"desc":"i=3: 3≥3 ✓ h=3"},{"active":[3],"labels":{"4":3},"desc":"i=4: 1<4 ✗ Ответ: h=3"}]}},

// ===== PREFIX SUM =====
{id:"ps1",t:"LC 560 Subarray Sum Equals K",p:"Prefix Sum",d:"средне",
desc:`Дан массив целых чисел nums и число k. Найти общее ==количество непрерывных подмассивов, сумма== элементов которых ==равна k==.

Пример 1:
Ввод: nums = [1, 1, 1], k = 2
Вывод: 2
Пояснение: подмассивы [1,1] (индексы 0-1) и [1,1] (индексы 1-2)

Пример 2:
Ввод: nums = [1, 2, 3], k = 3
Вывод: 2
Пояснение: подмассивы [1,2] и [3]

Пример 3:
Ввод: nums = [7, 3, 1, 5, 5, 5, 10], k = 10
Вывод: 4
Пояснение: [7,3], [5,5], [5,5], [10]

Ограничения:
- 1 ≤ nums.length ≤ 2 × 10⁴
- -1000 ≤ nums[i] ≤ 1000
- -10⁷ ≤ k ≤ 10⁷`,
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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один проход: обновляем currentSum и проверяем HashMap за O(1) в среднем — O(n). Карта до n различных сумм — O(n) памяти.`,
expl:`Наблюдение: сумма nums[i+1..j] = prefix[j] - prefix[i] = k ↔ prefix[i] = currentSum - k. Для каждого j проверяем: сколько раз значение (currentSum - k) уже встречалось — столько подмассивов оканчивается здесь с нужной суммой. map.put(0, 1) в начале — чтобы поймать подмассивы с самого нулевого индекса. Текущий префикс добавляем в карту ПОСЛЕ проверки. O(n) время, O(n) память.`,
repoSimilar:["ps2","ps4"]},

{id:"ps2",t:"Последовательность с суммой K",p:"Prefix Sum",d:"легко",
desc:`Дан неотсортированный массив nums целых чисел, необходимо определить, существует ли такая ==непрерывная последовательность, сумма элементов которой равна k==.
Нужно вернуть индекс последнего элемента первой встретившейся последовательности, иначе -1.

Пример 1:
Ввод: nums = [1, 2, 3], k = 5
Вывод: 2

Пример 2:
Ввод: nums = [1, 2, 3], k = 7
Вывод: -1

Пример 3:
Ввод: nums = [1, 2, 5, 7], k = 7
Вывод: 2
Объяснение: существует 2 непрерывных последовательности, в сумме равные 7 [2, 5] и [7] в качестве ответа возвращаем последний индекс последовательности [2, 5], так как она встретилась раньше.

Ограничения:
- len(nums) >= 1
- k >= 0`,
hint:`Та же техника префиксных сумм, но возвращаем индекс при первом совпадении.`,
code:`class Solution {
    public int findSubarrayEnd(int[] nums, int k) {
        Set<Integer> prefixSums = new HashSet<>();
        prefixSums.add(0);
        
        int currentSum = 0;
        for (int i = 0; i < nums.length; i++) {
            currentSum += nums[i];
            
            if (prefixSums.contains(currentSum - k)) {
                return i;  
            }
            
            prefixSums.add(currentSum);
        }
        
        return -1;
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Линейный проход с currentSum и проверкой HashMap — O(n). Карта «сумма → индекс» до O(n) записей.`,
expl:`Та же идея что ps1: сумма nums[i+1..j] = k ↔ prefix[i] = currentSum - k. HashSet хранит все предыдущие префиксы. prefixSums.add(0) в начале — для подмассивов с индекса 0. Если (currentSum - k) есть в сете — нашли правую границу, возвращаем i. Текущий префикс добавляем в сет ПОСЛЕ проверки. O(n) время и память.`,
repoSimilar:["ps1","ps4"]},

{id:"ps4",t:"Последовательность с суммой K — диапазон индексов",p:"Prefix Sum",d:"средне",
desc:`Дан неотсортированный массив nums целых чисел и число k. Необходимо найти ==непрерывный подмассив==, сумма элементов которого равна k.

Нужно вернуть список из двух элементов — ==индексы начала и конца== любого подходящего подмассива (включительно). Если такого подмассива не существует, вернуть [−1, −1].

Пример 1:
Ввод: nums = [9, −6, 5, 3, 2, 7], k = 10
Вывод: [2, 4]
Объяснение: подмассив [5, 3, 2] с индексами 2…4, сумма 10.

Пример 2:
Ввод: nums = [1, 2, 3], k = 7
Вывод: [−1, −1]

Пример 3:
Ввод: nums = [1, 2, 5, 7], k = 7
Вывод: [1, 2]
Объяснение: подходят [2, 5] (индексы 1–2) и [7] (3–3); допустим любой вариант.

Ограничения:
len(nums) ≥ 1`,
hint:`Префиксная сумма + HashMap: если currentSum − k уже в карте, подмассив с началом (индекс после сохранённой позиции) и концом в текущем idx. putIfAbsent — берём самое раннее начало.`,
code:`import java.util.*;

class Solution {
    public List<Integer> subsequenceSumK(List<Integer> nums, int k) {
        Map<Integer, Integer> prefixIndex = new HashMap<>();
        prefixIndex.put(0, -1);
        int prefixSum = 0;

        for (int idx = 0; idx < nums.size(); idx++) {
            prefixSum += nums.get(idx);
            int diff = prefixSum - k;
            if (prefixIndex.containsKey(diff)) {
                return Arrays.asList(prefixIndex.get(diff) + 1, idx);
            }
            prefixIndex.putIfAbsent(prefixSum, idx);
        }
        return Arrays.asList(-1, -1);
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один проход с обновлением prefixSum и проверкой HashMap — O(n) в среднем. Карта хранит до O(n) различных префиксных сумм — O(n) памяти.`,
expl:`Сумма nums[l..r] = prefix[r] − prefix[l−1]. Ищем в карте prefix[r]−k = префикс до l−1. Индекс начала: сохранённый индекс + 1. putIfAbsent даёт самое раннее начало при нескольких вариантах. O(n) время и память.`,
lcSimilar:[{"t":"Subarray Sum Equals K","h":"subarray-sum-equals-k"}],
repoSimilar:["ps1","ps2"]},

{id:"ps5",t:"LC 523. Continuous Subarray Sum",p:"Prefix Sum",d:"средне",
desc:`Дан массив целых чисел nums и целое число k. Вернуть true, если существует ==непрерывный подмассив длиной не менее 2==, сумма которого ==кратна k==.

Пример:
Ввод: nums = [23,2,4,6,7], k = 6
Вывод: true
Объяснение: [2,4] имеет сумму 6.

Ввод: nums = [23,2,6,4,7], k = 13
Вывод: false`,
hint:`Префиксные суммы по модулю k: если один и тот же остаток встретился дважды на расстоянии >= 2, между ними есть подмассив с суммой, кратной k.`,
code:`class Solution {
    public boolean checkSubarraySum(int[] nums, int k) {
        //Если у нас есть два префикса с одинаковым остатком от деления на k, то сумма элементов между ними кратна k.
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);
        int prefix = 0;

        for (int i = 0; i < nums.length; i++) {
            prefix = (prefix + nums[i]) % k;
            if (map.containsKey(prefix)) {
                if (i - map.get(prefix) >= 2) return true;
            } else {
                map.put(prefix, i);
            }
        }

        return false;
    }
}`,
complexity:`Время: O(n), Память: O(k)`,
complexityExpl:`Один проход по nums — O(n). В HashMap храним первое вхождение остатка prefix % k; число разных остатков ограничено k (и не больше n), поэтому O(k).`,
expl:`Если у нас есть два префикса с одинаковым остатком от деления на k, то сумма элементов между ними кратна k.
Три важных нюанса:
1) map.put(0, -1) — позволяет поймать случай, когда префикс с индекса 0 уже кратен k.
2) i - map.get(prefix) >= 2 — длина подмассива должна быть минимум 2.
3) map.put(prefix, i) только в ветке else — сохраняем первое вхождение остатка, чтобы не терять максимально ранний индекс.`,
lcSimilar:[{"n":523,"t":"Continuous Subarray Sum","h":"continuous-subarray-sum"}],
repoSimilar:["ps1","ps4"]},

// ===== PREFIX SUM EXT. =====
{id:"pse1",t:"LC 238 · Product of Array Except Self",p:"Prefix Sum Ext.",d:"легко",
desc:`Дан массив nums. Вернуть массив, где каждый элемент — ==произведение всех кроме текущего==. Без деления.

Пример:
Ввод: [1, 2, 3, 4]
Вывод: [24, 12, 8, 6]`,
hint:`Два прохода: слева направо (prefix product) и справа налево (suffix product).`,
code:`class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        // первый проход: result[i] = произведение всех элементов левее i
        // для i=0 левее ничего нет — нейтральный элемент умножения
        result[0] = 1;
        for (int i = 1; i < n; i++) {
            result[i] = result[i - 1] * nums[i - 1];
        }

        // второй проход: suffix накапливает произведение всех элементов правее i
        // умножаем на уже лежащий prefix — получаем произведение всех кроме i
        int suffix = 1;
        for (int i = n - 2; i >= 0; i--) {
            suffix *= nums[i + 1];
            result[i] *= suffix;
        }

        return result;
    }
}`,
complexity:`Время: O(n), Память: O(1) доп.`,
complexityExpl:`Два прохода: слева префиксные произведения, справа суффикс в переменной — O(n). Кроме массива ответа — O(1) доп. памяти.`,
expl:`Первый проход слева направо: result[i] = произведение всех элементов левее i. Второй проход справа налево: накапливаем suffix = произведение всех правее i, умножаем result[i] *= suffix. Итог: result[i] = prefix * suffix = всё кроме i. O(n) время, O(1) доп. память.`,
lcSimilar:[{"t":"LC 238 · Product of Array Except Self","h":"lc-238-product-of-array-except-self"}]},

{id:"pse2",t:" LC 724 — Find Pivot Index",p:"Prefix Sum Ext.",d:"средне",
desc:`Найти индекс, где ==сумма слева равна сумме справа==.

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Сумма всех элементов O(n), затем один проход с leftSum — O(n). Пара переменных — O(1) памяти.`,
expl:`O(n) один проход (после подсчёта суммы). rightSum = totalSum - leftSum - nums[i]. Когда leftSum == rightSum — нашли pivot.`},

// ===== SW + STRING =====
{id:"sw1",t:"Minimum Window Substring",p:"SW + String",d:"сложно",
desc:`Даны две строки s и t. Найти ==минимальную по длине подстроку==, которая ==содержит все символы== строки t (включая дубликаты). Если такой подстроки нет — вернуть пустую строку "".

Пример 1:
Ввод: s = "ADOBECODEBANC", t = "ABC"
Вывод: "BANC"
Пояснение: минимальное окно, содержащее A, B, C — "BANC"

Пример 2:
Ввод: s = "a", t = "a"
Вывод: "a"

Пример 3:
Ввод: s = "a", t = "aa"
Вывод: ""
Пояснение: в s только одна 'a', а нужны две

Ограничения:
- 1 ≤ s.length, t.length ≤ 10⁵
- s и t состоят из английских букв (upper + lower)
- Гарантируется единственный минимальный ответ`,
hint:`Sliding window: расширяем правую границу пока не покроем все символы t, затем сжимаем левую для минимизации.`,
code:`class Solution {
    public String minWindow(String s, String t) {
        if (s == null || t == null
            || s.length() < t.length()) return "";

        // freq[c] > 0 — нужен, = 0 — покрыт, < 0 — лишний
        int[] freq = new int[128];
        for (char c : t.toCharArray()) freq[c]++;

        int needCount = t.length();  // сколько символов ещё нужно
        int left = 0;
        int bestStart = 0;
        int minLen = Integer.MAX_VALUE;

        for (int right = 0; right < s.length(); right++) {
            char rightChar = s.charAt(right);

            // Добавляем правый символ
            if (freq[rightChar] > 0) needCount--;
            freq[rightChar]--;

            // Пока всё покрыто — сжимаем окно слева
            while (needCount == 0) {
                int windowSize = right - left + 1;
                if (windowSize < minLen) {
                    minLen = windowSize;
                    bestStart = left;
                }

                // Удаляем левый символ
                char leftChar = s.charAt(left);
                freq[leftChar]++;
                if (freq[leftChar] > 0) needCount++;
                left++;
            }
        }

        return minLen == Integer.MAX_VALUE ? ""
            : s.substring(bestStart, bestStart + minLen);
    }
}`,
complexity:`Время: O(|s|), Память: O(1)`,
complexityExpl:`Левый и правый указатели двигаются только вправо — O(|s|) амортизированно. Массив need фиксированного размера — O(1) памяти.`,
expl:`Шаг 1: проходим по t и записываем частоты нужных символов в need[], needCount = |t|.
Шаг 2: расширяем right — уменьшаем need[char], если need[char] стало >= 0 → decrementим needCount.
Шаг 3: когда needCount == 0 — все символы покрыты, фиксируем минимальное окно.
Шаг 4: сжимаем left — увеличиваем need[s[left]], если need[s[left]] стало > 0 → incrementим needCount.
Повторяем пока не пройдём всю строку.`,
lcSimilar:[{"t":"Minimum Window Substring","h":"minimum-window-substring"},{"t":"Permutation in String","h":"permutation-in-string"}],
repoSimilar:["sw3","sw8","sw9"]},

// ===== SLIDING WINDOW =====
{id:"sw2",t:"Longest Repeating Char Replacement",p:"Sliding Window",d:"средне",
desc:`Дана строка s и число k. Можно заменить до k символов. Найти ==длину самой длинной подстроки== из одинаковых символов.

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
            // Расширяем окно вправо
            char c = s.charAt(right);
            freq[c - 'A']++;
            maxFreq = Math.max(maxFreq, freq[c - 'A']);
            
            // Проверяем, нужно ли сужать окно
            int windowLength = right - left + 1;
            if (windowLength - maxFreq > k) {
                // Сужаем окно слева
                freq[s.charAt(left) - 'A']--;
                left++;
                // maxFreq может уменьшиться, но мы его не обновляем вниз
                // Это оптимизация: если maxFreq был достигнут, он остаётся
                // Актуальное значение не нужно, так как мы проверяем только windowLength - maxFreq > k
            }
            
            // Обновляем результат
            result = Math.max(result, right - left + 1);
        }
        
        return result;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`right проходит строку один раз, left тоже не более n раз — O(n). Массив частот на 26 букв — O(1) памяти.`,
expl:`Хотим найти окно, где заменой k символов можно получить строку из одинаковых. Количество нужных замен = длина окна − частота самого частого символа (windowLength − maxFreq). Если это значение > k — замен не хватает, сжимаем слева.
maxFreq специально не уменьшаем при сжатии: нас интересует только нахождение окна лучше текущего максимума. Если maxFreq недостижим при текущем left — окно просто не вырастет, но и не уменьшится. Результат берётся из window size, который монотонно растёт.`},

// ===== SW + STRING =====
{id:"sw3",t:"Поиск анаграмм",p:"SW + String",d:"средне",
desc:`Найти все стартовые индексы ==анаграмм строки t в строке s==.

Пример:
Ввод: s = "cbaebabacd", t = "abc"
Вывод: [0, 6]

"cba" (индекс 0) и "bac" (индекс 6) — анаграммы "abc".`,
hint:`Фиксированное окно длины len(t). Частотный массив + счётчик несовпадений.`,
code:`class Solution {
    public List<Integer> findAnagrams(String s, String t) {
        List<Integer> result = new ArrayList<>();
        if (s.length() < t.length()) return result;

        // freq[c] > 0 — нужен, = 0 — покрыт, < 0 — лишний
        int[] freq = new int[128];
        for (char c : t.toCharArray()) freq[c]++;

        int needCount = t.length();  // сколько символов ещё нужно
        int windowSize = t.length(); // фиксированный размер окна

        for (int right = 0; right < s.length(); right++) {
            char rightChar = s.charAt(right);

            // Добавляем правый символ
            if (freq[rightChar] > 0) needCount--;
            freq[rightChar]--;

            // Удаляем левый символ (когда окно полное)
            if (right >= windowSize) {
                char leftChar = s.charAt(right - windowSize);
                freq[leftChar]++;
                if (freq[leftChar] > 0) needCount++;
            }

            // Проверяем анаграмму
            if (needCount == 0) {
                result.add(right - windowSize + 1);
            }
        }

        return result;
    }
}`,
complexity:`Время: O(|s|), Память: O(1)`,
complexityExpl:`Один проход с окном длины |t|, на каждом шаге обновляем freq и needCount — O(|s|). Массив freq[128] — O(1) памяти.`,
expl:`Шаг 1: проходим по t и заполняем freq[] — сколько каждого символа нужно, needCount = |t|. Шаг 2: фиксированное окно размера |t| скользит по s: правый край добавляет символ (если freq[c] > 0 → needCount--; freq[c]--), левый убирает (freq[c]++; если freq[c] > 0 → needCount++). Когда needCount == 0 — анаграмма, записываем индекс. O(n).`,
lcSimilar:[{"t":"Minimum Window Substring","h":"minimum-window-substring"},{"t":"Permutation in String","h":"permutation-in-string"}],
repoSimilar:["sw1","sw8","sw9"],
diagram:{"type":"multi","data":["c","b","a","e","b","a","b","a","c","d"],"steps":[{"structs":[{"type":"String","name":"s","data":["c","b","a","e","b","a","b","a","c","d"],"active":[0,1,2]},{"type":"int[]","name":"freq","data":{"a":1,"b":1,"c":1}},{"type":"int","name":"needCount","data":"0 ✓"}],"desc":"Окно [c,b,a] — freq покрыт, needCount=0"},{"structs":[{"type":"String","name":"s","data":["c","b","a","e","b","a","b","a","c","d"],"active":[1,2,3]},{"type":"int[]","name":"freq","data":{"a":1,"b":1,"c":0,"e":-1}},{"type":"int","name":"needCount","data":"1"}],"desc":"Окно [b,a,e] — e лишняя, needCount=1"},{"structs":[{"type":"String","name":"s","data":["c","b","a","e","b","a","b","a","c","d"],"active":[6,7,8]},{"type":"int[]","name":"freq","data":{"a":1,"b":1,"c":1}},{"type":"int","name":"needCount","data":"0 ✓"}],"desc":"Окно [b,a,c] — анаграмма найдена!"}]}},

// ===== ONE PASS WITH STATE =====
{id:"sw4",t:"LC 674 Longest Continuous Increasing Subsequence",p:"One Pass with State",d:"легко",
desc:`Найти длину самого длинного ==непрерывного строго возрастающего подмассива==.

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
                maxLength = Math.max(maxLength, currLength);
            } else {
                currLength = 1;
            }
        }

        return maxLength;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один цикл от 1 до n−1, сравнение соседей — O(n). Несколько счётчиков — O(1) памяти.`,
expl:`Один проход O(n). Если текущий элемент > предыдущего — увеличиваем длину. Иначе — сбрасываем до 1. Запоминаем максимум.`,
lcSimilar:[{"t":"LC 674 · Longest Continuous Increasing Subsequence","h":"lc-674-longest-continuous-increasing-subsequence"}]},

// ===== SLIDING WINDOW =====
{id:"sw5",t:"Наглый подставной отчет",p:"Sliding Window",d:"средне",
desc:`Дан бинарный массив. Можно заменить до k нулей на единицы. Найти ==максимальную длину подмассива из единиц==.

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
            if (nums[right] == 0) {
                zerosCount++;
            }

            while (zerosCount > k) {
                if (nums[left] == 0) zerosCount--;
                left++;
            }

            result = Math.max(result, right - left + 1);
        }

        return result;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Два указателя: right проходит массив, left только увеличивается — O(n). Счётчики — O(1) памяти.`,
expl:`Скользящее окно с двумя указателями. Расширяем окно вправо (right), считаем нули внутри. Когда нулей становится > k — сжимаем слева: сдвигаем left, уменьшая zerosCount если nums[left] == 0. На каждом шаге обновляем максимум длины окна (right - left + 1). O(n) время, O(1) память.`,
lcSimilar:[{"t":"Minimum Window Substring","h":"minimum-window-substring"},{"t":"Permutation in String","h":"permutation-in-string"}],
diagram:{"type":"window","data":[1,0,1,1,0,1,1,0],"steps":[{"wl":0,"wr":0,"desc":"Начало: окно [0], нулей=0, k=2"},{"wl":0,"wr":1,"desc":"Расширяем → нулей=1"},{"wl":0,"wr":4,"desc":"Расширяем → нулей=2, ОК"},{"wl":0,"wr":6,"desc":"[1,0,1,1,0,1,1] длина=7"},{"wl":0,"wr":7,"desc":"Нулей=3 > k! Сжимаем"},{"wl":2,"wr":7,"desc":"Сжали → нулей=2. Ответ: 7"}]}},

// ===== ONE PASS WITH STATE =====
{id:"sw6",t:"LeetCode 1493 Longest Subarray of 1's After Deleting One Element.",p:"One Pass with State",d:"средне",
desc:`Дан бинарный массив. ==Удалить ровно один элемент==. Найти ==максимальную длину подмассива из единиц==.

Пример:
Ввод: [1, 1, 0, 1]
Вывод: 3 (удаляем 0, получаем [1,1,1])

Ввод: [1, 1, 1]
Вывод: 2 (обязательно удаляем один элемент)`,
hint:`Скользящее окно: разрешаем не более одного нуля в окне. Расширяем right, считаем нули. Когда нулей > 1 — сжимаем left. Длина результата = right − left (без +1, так как один элемент обязательно удаляем).`,
code:`class Solution {
    public int longestSubarray(int[] nums) {
        int left = 0;
        int zeroCount = 0;
        int maxLen = 0;
        
        for (int right = 0; right < nums.length; right++) {
            // Добавляем правый элемент
            if (nums[right] == 0) zeroCount++;
            
            // Если нулей больше 1, убираем слева
            while (zeroCount > 1) {
                if (nums[left] == 0) zeroCount--;
                left++;
            }
            
            // Длина подмассива после удаления одного элемента
            maxLen = Math.max(maxLen, right - left);
        }
        
        return maxLen;
    }
}`,
code2:`import java.util.*;

public class Solution {
    public int maxOnesAfterDeletions(List<Integer> nums) {
        int prev = 0;      // количество единиц до последнего нуля
        int curr = 0;      // текущее количество подряд идущих единиц
        int maxLen = 0;
        boolean hasZero = false;
        
        for (int num : nums) {
            if (num == 1) {
                curr++;
            } else {
                hasZero = true;
                prev = curr;
                curr = 0;
            }
            // обновляем ответ
            maxLen = Math.max(maxLen, prev + curr);
        }
        // если нулей не было, удаляем одну единицу
        return hasZero ? maxLen : maxLen - 1;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход с обновлением prev и curr при нулях — O(n). Константные переменные — O(1) памяти.`,
expl:`Задача сводится к: найти максимальное окно с не более чем одним нулём, удалить из него ровно один элемент. Скользящее окно: расширяем right, считаем нули. Когда нулей > 1 — сжимаем left.
Ключевой момент: длина подмассива единиц = right − left, а не right − left + 1. Потому что один элемент нужно обязательно удалить — это или ноль внутри окна, или любая единица если нулей нет. В обоих случаях убираем один символ из окна длины (right − left + 1), получаем right − left.`,
lcSimilar:[{"n":1493,"t":"Longest Subarray of 1's After Deleting One Element","h":"longest-subarray-of-1-s-after-deleting-one-element"}]},

{id:"sw7",t:"Подставной отчет",p:"One Pass with State",d:"средне",
desc:`Дан бинарный массив. Можно ==перевернуть ОДИН ноль в единицу==. Найти ==максимальную длину подмассива== из единиц.

Пример:
Ввод: [1, 1, 0, 1, 1, 1, 1, 0, 1]
Вывод: 7 (переворачиваем ноль на позиции 2)`,
hint:`Отслеживаем count единиц до нуля и после. Ответ = prev + 1 + count.`,
code:`public int maxOnesWithFlip(int[] nums) {
    int prev = 0;
    int count = 0;
    int maxCount = 0;
    boolean hasZero = false;  // флаг: был ли ноль
    
    for (int num : nums) {
        if (num == 1) {
            count++;
        } else {
            hasZero = true;  // встретили ноль
            maxCount = Math.max(maxCount, prev + 1 + count);
            prev = count;
            count = 0;
        }
    }
    
    maxCount = Math.max(maxCount, prev + 1 + count);
    
    // Если не было ни одного нуля, вычитаем лишнюю единицу
    if (!hasZero) {
        maxCount--;
    }
    
    return maxCount;
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Линейный проход с подсчётом блоков единиц — O(n). Несколько целых — O(1) памяти.`,
expl:`prev — единицы перед последним нулём, count — единицы после. При нуле: prev + 1 + count (1 — перевёрнутый ноль). Ограничиваем длиной массива. O(n).`,
lcSimilar:[{"t":"Minimum Window Substring","h":"minimum-window-substring"},{"t":"Permutation in String","h":"permutation-in-string"}],
diagram:{"type":"window","data":["a","b","c","a","b","c","b","b"],"steps":[{"wl":0,"wr":0,"desc":"Окно [a], все уникальны"},{"wl":0,"wr":2,"desc":"Окно [a,b,c], 3 уникальных"},{"wl":0,"wr":3,"desc":"Добавили a — повтор! Сжимаем"},{"wl":1,"wr":3,"desc":"Окно [b,c,a], снова ОК"},{"wl":4,"wr":7,"desc":"Сжали до [c,b,b] — финал"}]}},

// ===== SW + STRING =====
{id:"sw8",t:"Подстроки с полным алфавитом",p:"SW + String",d:"средне",
desc:`Подсчитать ==количество подстрок==, содержащих ==все уникальные символы== s.

Пример:
Ввод: "abca"
Вывод: 3 (подстроки: "abca", "bca", "abc" — нет, "abca", "abca"[0..3], "bca"[1..3])`,
hint:`Скользящее окно. Расширяем пока не покроем все уникальные символы. Когда покрыли — все расширения вправо тоже валидны.`,
code:`class Solution {
    public int countComplete(String s) {
        // target — сколько уникальных символов нужно собрать
        int target = (int) s.chars().distinct().count();

        // freq[c] — сколько раз символ в текущем окне
        int[] freq = new int[128];

        int haveCount = 0;  // сколько уникальных уже в окне
        int left = 0;
        int count = 0;

        for (int right = 0; right < s.length(); right++) {
            char rightChar = s.charAt(right);
            freq[rightChar]++;
            if (freq[rightChar] == 1) haveCount++;

            // Пока окно "полное" — сжимаем слева
            while (haveCount == target) {
                // Все суффиксы от right до конца тоже валидны
                count += s.length() - right;

                // Удаляем левый символ
                char leftChar = s.charAt(left);
                freq[leftChar]--;
                if (freq[leftChar] == 0) haveCount--;

                left++;
            }
        }

        return count;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`right идёт один раз, left сдвигается при валидном окне — O(n). Массив freq[128] — O(1) памяти.`,
expl:`Шаг 1: считаем количество уникальных символов (unique). Шаг 2: расширяем right — при freq[char] == 1 → covered++. Шаг 3: когда covered == unique — все уникальные в окне; все дальнейшие расширения вправо (s.length() - right) тоже валидны, сразу прибавляем к ответу. Шаг 4: сжимаем left — при freq[char] == 0 → covered--. O(n).`,
lcSimilar:[{"t":"Number of Substrings Containing All Three Characters","h":"number-of-substrings-containing-all-three-characters"},{"t":"Substrings with Concatenation of All Words","h":"substrings-with-concatenation-of-all-words"}],
repoSimilar:["sw1","sw3","sw9"]},

{id:"sw9",t:"Поиск мутирующего вируса",p:"SW + String",d:"средне",
desc:`Проверить, содержит ли строка gene какую-либо ==перестановку строки virus==.

Пример:
Ввод: gene = "cdeebba", virus = "abb"
Вывод: true ("bba" — перестановка "abb")`,
hint:`Фиксированное окно длиной virus + частотный массив + счётчик несовпадений (аналог поиска анаграмм).`,
code:`class Solution {
    public boolean containsMutation(String gene,
                                    String virus) {
        if (gene.length() < virus.length()) return false;

        // freq[c] > 0 — нужен, = 0 — покрыт, < 0 — лишний
        int[] freq = new int[128];
        for (char c : virus.toCharArray()) freq[c]++;

        int needCount = virus.length();  // сколько символов ещё нужно
        int windowSize = virus.length(); // фиксированный размер окна

        for (int right = 0; right < gene.length(); right++) {
            char rightChar = gene.charAt(right);

            // Добавляем правый символ
            if (freq[rightChar] > 0) needCount--;
            freq[rightChar]--;

            // Удаляем левый символ (когда окно полное)
            if (right >= windowSize) {
                char leftChar = gene.charAt(right - windowSize);
                freq[leftChar]++;
                if (freq[leftChar] > 0) needCount++;
            }

            // Проверяем мутацию
            if (needCount == 0) return true;
        }

        return false;
    }
}`,
complexity:`Время: O(|gene|), Память: O(1)`,
complexityExpl:`Скользящее окно длины |virus| по gene с O(1) обновлениями — O(|gene|). Массив freq[128] — O(1) памяти.`,
expl:`Та же техника, что и поиск анаграмм, но возвращаем boolean. Фиксированное окно, freq массив, счётчик needCount. O(n).`,
repoSimilar:["sw1","sw3","sw8"]},

// ===== SLIDING WINDOW =====
{id:"sw10",t:"Инвестор в стране дураков",p:"Sliding Window",d:"средне",
desc:`В стране дураков вместо сложения используют умножение и богатый инвестор хочет этим воспользоваться, чтобы заработать и выкупить k подряд идущих домов.
Дан массив price и число k. Найдите произведения всех подряд идущих участков длины k. Массив price — цены домов, если price[i] ≤ 0, это должник — он покроет долг и доплатит при необходимости.

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
        
        // Первое окно
        for (int i = 0; i < k; i++) {
            if (arr[i] == 0) {
                zeroCount++;
            } else {
                prod *= arr[i];
            }
        }
        
        result[0] = zeroCount > 0 ? 0 : (int) prod;
        
        // Сдвигаем окно - O(n)
        for (int i = k; i < n; i++) {
            // Удаляем левый элемент
            if (arr[i - k] == 0) {
                zeroCount--;
            } else {
                prod /= arr[i - k];
            }
            
            // Добавляем правый элемент
            if (arr[i] == 0) {
                zeroCount++;
            } else {
                prod *= arr[i];
            }
            
            result[i - k + 1] = zeroCount > 0 ? 0 : (int) prod;
        }
        
        return result;
    }
}`,
complexity:`Время: O(n), Память: O(1) доп.`,
complexityExpl:`Инициализация первого окна O(k), затем O(n−k) сдвигов — O(n). Массив результата O(n−k+1), дополнительно O(1).`,
expl:`O(n). Отслеживаем нули отдельно (zeroCount). Для ненулевых поддерживаем произведение, делим/умножаем при сдвиге окна. Если есть нули — результат = 0.`},

// ===== STACK =====
{id:"st1",t:"LC 20 · Valid Parentheses",p:"Stack",d:"легко",
desc:`Дана строка s, содержащая только символы '(', ')', '{', '}', '[', ']'. Определить, является ли строка допустимой.

Строка допустима если:
- Каждая открывающая ==скобка== закрыта соответствующей закрывающей
- ==Скобки закрываются в правильном порядке==
- Каждой закрывающей скобке соответствует открывающая того же типа

Пример 1:
Ввод: s = "()"
Вывод: true

Пример 2:
Ввод: s = "()[]{}"
Вывод: true

Пример 3:
Ввод: s = "([{}])"
Вывод: true

Пример 4:
Ввод: s = "(]"
Вывод: false

Пример 5:
Ввод: s = "([)]"
Вывод: false

Ограничения:
- 1 ≤ s.length ≤ 10⁴
- s состоит только из скобок '(){}[]'`,
hint:`Стек (ArrayDeque). Открывающую кладём, при закрывающей — сверяем с вершиной стека.`,
code:`class Solution {
    public boolean isValid(String s) {
        // стек хранит незакрытые открывающие скобки
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                // открывающая — кладём на стек, ждём пару
                stack.push(c);
            } else if (stack.isEmpty() || !isMatchingPair(stack.pop(), c)) {
                // закрывающая, но стек пуст — нет пары
                // или вершина стека не совпадает с текущей закрывающей
                return false;
            }
        }

        // если стек пуст — все открывающие закрыты
        // если нет — остались незакрытые скобки
        return stack.isEmpty();
    }

    private boolean isMatchingPair(char open, char close) {
        // проверяем что открывающая и закрывающая — одного типа
        return (open == '(' && close == ')')
            || (open == '{' && close == '}')
            || (open == '[' && close == ']');
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один проход: каждый символ — push или pop стека — O(n). Стек до n элементов — O(n) памяти.`,
expl:`O(n) время, O(n) память в худшем случае (все открывающие). Стек хранит незакрытые скобки. При закрывающей — проверяем пару с вершиной.`,
lcSimilar:[{"t":"LC 20 · Valid Parentheses","h":"lc-20-valid-parentheses"}]},

{id:"st2",t:"LeetCode 739 Daily Temperatures",p:"Stack",d:"средне",
desc:`Дан массив temperature, где temperature[i] — температура в i-й день. Нужно вернуть массив result, где result[i] — количество дней, через которое температура станет выше, чем в i-й день. Если потепления не будет, result[i] = 0.
Дни с одинаковой температурой не считаются потеплением.

Пример:
Ввод: [5, 6, 9, 7, 5, -1, 8, 11, 2]
Вывод: [1, 1, 5, 3, 2, 1, 1, 0, 0]`,
hint:`Монотонный стек с индексами. При текущем > вершины — извлекаем и записываем разницу индексов.`,
code:`import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int[] dailyTemperatures(int[] temps) {
        int n = temps.length;
        int[] ans = new int[n];

        // Храним индексы дней.
        // Температуры по этим индексам в стеке идут по убыванию.
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // Пока текущий день теплее дня на вершине стека,
            // мы нашли ответ для этого старого дня.
            while (!stack.isEmpty() && temps[i] > temps[stack.peek()]) {
                int prevDay = stack.pop();
                ans[prevDay] = i - prevDay;
            }

            // Текущий день пока тоже ждёт свой более тёплый день справа.
            stack.push(i);
        }

        return ans;
    }
}`,
code2:`import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

class Solution {
    public List<Integer> predictWarming(List<Integer> temperatures) {
        List<Integer> result = new ArrayList<>();
        // инициализируем результат нулями
        for (int i = 0; i < temperatures.size(); i++) {
            result.add(0);
        }
        // в стеке всегда храним номер дня
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < temperatures.size(); i++) {
            int temperature = temperatures.get(i);
            // пока текущая температура больше, чем температура в стеке,
            // вынимаем и удаляем из стека элементы и вычисляем для них ответ
            while (!stack.isEmpty() && temperatures.get(stack.peek()) < temperature) {
                int idx = stack.pop();
                result.set(idx, i - idx);
            }
            stack.push(i);
        }
        return result;
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Каждый индекс кладётся и извлекается из стека не более одного раза — O(n). Стек до n элементов — O(n) памяти.`,
expl:`Монотонный убывающий стек хранит индексы. Каждый индекс push/pop ровно один раз → O(n). При нахождении более тёплого дня записываем разницу.`},

{id:"st3",t:"RPN-калькулятор",p:"Stack",d:"средне",
desc:`Вычислить выражение в ==обратной польской нотации (RPN)==.

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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один проход по токенам, на каждом операторе два pop и push — O(n). Стек до O(n) операндов — O(n) памяти.`,
expl:`Стек для RPN-вычислений. Числа — в стек. Оператор — извлекаем два операнда, считаем, результат обратно. Порядок важен для - и /. O(n).`},

// ===== MATH / SIMULATION =====
{id:"st4",t:"Простой калькулятор",p:"Math / Simulation",d:"средне",
desc:`Дан массив \`s\` с положительными числами и знаками \`*\` и \`+\`. Нужно вернуть результат вычислений и важно, чтобы решение было за \`O(1)\` по дополнительной памяти.

Пример:
Ввод: ["2","*","3","*","1","+","2"]
Вычисление: 2*3*1=6, 6+2=8
Вывод: 8`,
hint:`Накапливаем произведение. При + добавляем к result и начинаем новое произведение.`,
code:`class Solution {
    public int calculate(String[] s) {
        int result = 0;
        int currentProduct = 1;

        for (int i = 0; i < s.length; i++) {
            String token = s[i];

            if (token.equals("*")) {
                // просто пропускаем, умножение обработаем на числе
                continue;
            } else if (token.equals("+")) {
                // закончили блок умножений
                result += currentProduct;
                currentProduct = 1;
            } else {
                // это число
                int num = Integer.parseInt(token);
                currentProduct *= num;
            }
        }

        // добавить последний блок
        result += currentProduct;

        return result;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один цикл по токенам — O(n). Только result и prevMultiply — O(1) памяти.`,
expl:`Выражение — сумма произведений. prevMultiply накапливает текущее произведение. При + — добавляем его к result и начинаем новое. O(n) время, O(1) память.`},

// ===== STACK =====
{id:"st5",t:"Разворот слов",p:"Stack",d:"легко",
desc:`==Развернуть порядок слов==, сохраняя пробелы на своих местах.

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
                while (i < s.length() && s.charAt(i) == ' ') i++;
                parts.add(s.substring(start, i));
            } else {
                int start = i;
                while (i < s.length() && s.charAt(i) != ' ') i++;
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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Два прохода по строке — O(n). Список частей и deque слов — O(n) памяти.`,
expl:`Разделяем строку на блоки слов и пробелов. Слова собираем в deque в обратном порядке. При реконструкции сохраняем пробельные блоки и подставляем слова из deque. O(n).`},

// ===== TREES / DFS =====
{id:"tr1",t:"Number of Islands",p:"Trees / DFS",d:"средне",
desc:`Дана карта в виде двумерного массива grid из '1' (суша) и '0' (вода). Определить ==количество островов==. Остров — группа клеток с сушей, соединённых по горизонтали или вертикали. По диагонали клетки не считаются соединёнными. Карта окружена водой со всех сторон.

Пример 1:
Ввод: grid = [
  [1,1,1,1,0],
  [1,1,0,1,0],
  [1,1,0,0,0],
  [0,0,0,0,0]
]
Вывод: 1

Пример 2:
Ввод: grid = [
  [1,1,0,0,0],
  [1,1,0,0,0],
  [0,0,1,0,0],
  [0,0,0,1,1]
]
Вывод: 3

Ограничения:
- m == grid.length, n == grid[i].length
- 1 ≤ m, n ≤ 300
- grid[i][j] ∈ {'0', '1'}`,
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
complexity:`Время: O(m·n), Память: O(m·n)`,
complexityExpl:`Двойной цикл по клеткам; DFS посещает каждую '1' один раз — O(m·n). Глубина рекурсии в худшем O(m·n) — O(m·n) памяти.`,
expl:`DFS flood fill. При нахождении 1 — затапливаем весь остров (ставим 0), +1 к счётчику. Каждая клетка посещается один раз. O(m×n) время и память.`},

{id:"tr2",t:"LC 101 Symmetric Tree",p:"Trees / DFS",d:"легко",
desc:`Дан корень ==бинарного дерева==. Проверить, является ли дерево ==симметричным== (зеркальным отражением самого себя).

Пример 1:
Ввод: root = [1, 2, 2, 3, 4, 4, 3]
    1
   / \\
  2   2
 / \\ / \\
3  4 4  3
Вывод: true

Пример 2:
Ввод: root = [1, 2, 2, null, 3, null, 3]
    1
   / \\
  2   2
   \\   \\
   3    3
Вывод: false

Ограничения:
- Количество узлов: [1, 1000]
- -100 ≤ Node.val ≤ 100`,
hint:`Сравниваем left.left с right.right и left.right с right.left рекурсивно.`,
code:`class Solution {
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isMirror(root.left, root.right);
    }

    private boolean isMirror(TreeNode left, TreeNode right) {
        if (left == null && right == null) return true;

        if (left == null || right == null) return false;

        if (left.val != right.val) return false;

        return isMirror(left.left, right.right) && isMirror(left.right, right.left);
    }
}`,
complexity:`Время: O(n), Память: O(h)`,
complexityExpl:`Рекурсия isMirror посещает каждый узел один раз — O(n). Стек вызовов глубины h — O(h) памяти.`,
expl:`Рекурсивное зеркальное сравнение: left.left ↔ right.right и left.right ↔ right.left. O(n) время, O(h) стек рекурсии.`,
lcSimilar:[{"t":"LC 101 · Symmetric Tree","h":"lc-101-symmetric-tree"}]},

{id:"tr3",t:"LC 98 · Validate Binary Search Tree",p:"Trees / DFS",d:"легко",
desc:`Дан корень ==бинарного дерева==. Проверить, является ли оно ==валидным деревом поиска (BST)==.

Свойство BST: все значения в левом поддереве строго меньше текущего узла, все значения в правом поддереве строго больше.

Пример 1:
Ввод: root = [10, 5, 11, -2, 7, null, 15]
       10
      /  \\
     5    11
    / \\     \\
  -2   7    15
Вывод: true

Пример 2:
Ввод: root = [5, 1, 7, null, null, 4, 8]
    5
   / \\
  1   7
     / \\
    4   8
Вывод: false (4 < 5, но в правом поддереве)

Ограничения:
- Количество узлов: [1, 10⁴]
- -2³¹ ≤ Node.val ≤ 2³¹ - 1`,
hint:`Передавать min/max границы в рекурсию. Значение должно быть строго между low и high.`,
code:`class Solution {
    public boolean isValidBST(TreeNode root) {
        return isValid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean isValid(TreeNode node, long low, long high) {
        if (node == null) return true;

        if (node.val <= low || node.val >= high) {
            return false;
        }

        return isValid(node.left, low, node.val) && isValid(node.right, node.val, high);
    }
}`,
complexity:`Время: O(n), Память: O(h)`,
complexityExpl:`isValid обходит каждый узел один раз с границами — O(n). Глубина рекурсии — O(h) памяти.`,
expl:`Рекурсия с границами: для левого поддерева max = node.val, для правого min = node.val. Используем long для обработки граничных значений Integer. O(n).`,
lcSimilar:[{"t":"LC 98 · Validate Binary Search Tree","h":"lc-98-validate-binary-search-tree"}]},

{id:"tr4",t:"Поиск k-ого наименьшего",p:"Trees / DFS",d:"средне",
desc:`Дан корень BST и число k. Найти ==k-й наименьший элемент== в дереве (1-indexed).

Пример 1:
Ввод: root = [3, 1, 4, null, 2], k = 1
    3
   / \\
  1   4
   \\
    2
Вывод: 1

Пример 2:
Ввод: root = [10, 5, 11, -2, 7], k = 3
       10
      /  \\
     5    11
    / \\
  -2   7
Inorder: -2, 5, 7, 10, 11
Вывод: 7

Ограничения:
- Количество узлов: [1, 10⁴]
- 1 ≤ k ≤ количество узлов`,
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
complexity:`Время: O(h + k), Память: O(h)`,
complexityExpl:`Inorder-обход: спуск на глубину h + k шагов до k-го элемента — O(h+k). Рекурсивный стек — O(h) памяти.`,
expl:`Inorder-обход BST выдаёт элементы в отсортированном порядке. Считаем посещённые узлы, при count == k — нашли ответ. O(H + k) время.`},

// ===== TWO POINTERS =====
{id:"tp1",t:"Container With Most Water",p:"Two Pointers",d:"средне",
desc:`Дан массив heights, heights[i] — высота линии.
Найти ==максимальную площадь воды между двумя линиями==.
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
            int currArea = Math.min(height[l], height[r]) * (r - l);
            resultArea = Math.max(resultArea, currArea);

            if (height[l] < height[r]) {
                l++;
            } else {
                r--;
            }
        }

        return resultArea;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Цикл while двигает l или r на каждом шаге — O(n) итераций. Несколько переменных — O(1) памяти.`,
expl:`O(n) время, O(1) память. Два указателя с краёв. Сдвигаем меньший — сдвиг большего уменьшит ширину без возможности увеличить высоту.`},

{id:"tp2",t:"LC 125. Valid Palindrome",p:"Two Pointers",d:"легко",
desc:`Проверить, является ли строка ==палиндромом==, игнорируя неалфавитные символы и регистр.

Пример:
Ввод: "A man, a plan, a canal: Panama"
Вывод: true

Ввод: "race a car"
Вывод: false`,
hint:`Два указателя с краёв. Пропускаем не-буквы/не-цифры. Сравниваем в нижнем регистре.`,
code:`class Solution {
    public boolean isPalindrome(String s) {
        // два указателя с двух концов, сходятся к центру
        int l = 0;
        int r = s.length() - 1;

        while (l < r) {
            // пропускаем всё что не буква и не цифра слева
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            // пропускаем всё что не буква и не цифра справа
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;

            // сравниваем символы без учёта регистра
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) {
                return false;
            }

            // сдвигаем оба указателя к центру
            l++;
            r--;
        }

        // все пары совпали — палиндром
        return true;
    }
}

`,
code2:`class Solution {
    public boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !isAlphanumeric(s.charAt(l))) l++;
            while (l < r && !isAlphanumeric(s.charAt(r))) r--;
            if (toLower(s.charAt(l)) != toLower(s.charAt(r))) return false;
            l++;
            r--;
        }
        return true;
    }

    private boolean isAlphanumeric(char c) {
        return (c >= 'a' && c <= 'z')
            || (c >= 'A' && c <= 'Z')
            || (c >= '0' && c <= '9');
    }

    private char toLower(char c) {
        return (c >= 'A' && c <= 'Z') ? (char)(c + 32) : c;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Указатели l и r сходятся к центру — O(n). Только индексы — O(1) памяти.`,
expl:`Два указателя к центру. Пропускаем пунктуацию/пробелы. Сравниваем в нижнем регистре. O(n) время, O(1) память.`},

{id:"tp3",t:"LC 283. Move Zeroes",p:"Two Pointers",d:"легко",
desc:`Дан массив целых чисел nums. Переместить все нули в конец, сохраняя относительный порядок ненулевых элементов. Изменять массив нужно in-place, не создавая копию.

Пример:
Ввод: [0, 1, 0, 3, 12]
Вывод: [1, 3, 12, 0, 0]`,
hint:`Указатель записи для ненулевых элементов. После — заполняем оставшиеся нулями.`,
code:`class Solution {
    public void moveZeroes(int[] nums) {
        int write = 0;
        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != 0) {
                // ненулевой элемент — записываем на позицию write
                nums[write] = nums[read];
                write++;
            }
            // нулевой — read идёт дальше, write стоит на месте
        }
        // хвост от write до конца заполняем нулями
        while (write < nums.length) {
            nums[write] = 0;
            write++;
        }
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход сдвигает ненули, затем заполняем хвост нулями — O(n). In-place — O(1) памяти.`,
expl:`Fast/slow pointer. Быстрый проходит все элементы. Медленный (insert) — позиция записи ненулевых. После — заполняем хвост нулями. O(n).`,
p2:"Read / Write"},

{id:"tp4",t:"Сжатие пробелов",p:"Two Pointers",d:"легко",
desc:`Дан массив символов arr. Заменить каждую последовательность из одного или более пробелов ровно одним пробелом. Изменять массив нужно in-place. Вернуть новую длину массива.

Пример:
Ввод: ['a',' ',' ','b']
Вывод: ['a',' ','b']`,
hint:`Указатель записи + флаг prevSpace. Записываем пробел только если предыдущий символ не был пробелом.`,
code:`class Solution {
    public int compressSpaces(char[] arr) {
        int write = 0;
        boolean prevSpace = false;
        for (int read = 0; read < arr.length; read++) {
            if (arr[read] == ' ') {
                //если до этого был не пробел
                if (!prevSpace) {
                    arr[write++] = ' ';
                    prevSpace = true;
                }
            } else {
                arr[write++] = arr[read];
                prevSpace = false;
            }
        }
        return write;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход по arr с указателем записи w — O(n). In-place — O(1) памяти.`,
expl:`Указатель записи w. Пробел записываем только при !prevSpace. Возвращаем новую длину. O(n) время, O(1) память.`,
p2:"Read / Write"},

{id:"tp5",t:"LC 392. Is Subsequence",p:"Two Pointers",d:"легко",
desc:`Проверить, является ли s ==подпоследовательностью== t (символы s встречаются в t в том же порядке).

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
complexity:`Время: O(|t|), Память: O(1)`,
complexityExpl:`Указатель по t проходит строку один раз — O(|t|). Два индекса — O(1) памяти.`,
expl:`Два указателя: p1 по s, p2 по t. При совпадении продвигаем оба, иначе только p2. Если p1 дошёл до конца — s является подпоследовательностью t. O(|t|).`,
lcSimilar:[{"t":"Remove Invalid Parentheses","h":"remove-invalid-parentheses"},{"t":"Valid Parentheses","h":"valid-parentheses"}],
diagram:{"type":"twoptr","data":["a","1","b","2","c","3"],"steps":[{"l":0,"r":0,"desc":"s=abc, t=a1b2c3"},{"l":0,"r":0,"found":[0],"desc":"a == a ✓"},{"l":1,"r":2,"found":[2],"desc":"b == b ✓"},{"l":2,"r":4,"found":[4],"desc":"c == c ✓ Найдено!"}]}},

{id:"tp6",t:"LC 167. Two Sum II - Input Array Is Sorted",p:"Two Pointers",d:"легко",
desc:`Найти ==два элемента в отсортированном массиве, дающих в сумме target==. Вернуть их индексы (1-based). O(1) доп. памяти.

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Два указателя с концов: на каждом шаге сдвигается один — O(n). Константная память.`,
expl:`Массив отсортирован → два указателя. Сумма < target → увеличиваем (l++). Сумма > target → уменьшаем (r--). O(n) время, O(1) память.`},

{id:"tp7",t:"LC 350. Intersection of Two Arrays II",p:"Two Pointers",d:"легко",
desc:`Найти ==общие элементы двух отсортированных массивов== (с учётом дубликатов).

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
complexity:`Время: O(n + m), Память: O(min(n, m))`,
complexityExpl:`Указатели по двум массивам, каждый элемент один раз — O(n+m). Список совпадений — O(min(n,m)) памяти.`,
expl:`Merge-подобная техника на отсортированных массивах. При совпадении — добавляем и двигаем оба указателя. Иначе — двигаем указатель на меньший элемент. O(n+m).`},

{id:"tp8",t:"LC 228. Свертка в диапазоны (Summary Ranges)",p:"Two Pointers",d:"средне",
desc:`Дан список неотрицательных целых чисел nums, ==повторов нет==. Нужно преобразовать его в строку, сворачивая соседние по числовому ряду числа в диапазоны.
Если числа идут подряд (разница 1), записать как =="x-y"==. Иначе одно число ==("x")==. Диапазоны через ==запятую==.

Пример 1:
Ввод: nums = [1,4,5,2,3,9,8,11,0]
Вывод: "0-5,8-9,11"`,
hint:`После сортировки — два индекса l и r: расширяйте r, пока nums[r+1] == nums[r] + 1. Фиксируйте сегмент и переходите к следующему.`,
code:`class Solution {
    public List<String> summaryRanges(int[] nums) {
        Arrays.sort(nums);
        List<String> list = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            int start = nums[i];
            while (i + 1 < nums.length && nums[i + 1] == nums[i] + 1) {
                i++;
            }
            StringBuilder sb = new StringBuilder();
            sb.append(start);
            if (start != nums[i]) {
                sb.append("->").append(nums[i]);
            }
            list.add(sb.toString());
        }
        return list;
    }
}`,
code2:`import java.util.*;

public class Solution {
    public String counterRanges(List<Integer> nums) {
        Collections.sort(nums);
        List<String> result = new ArrayList<>();
        int l = 0, r = 0;
        
        while (l < nums.size()) {
            while (r + 1 < nums.size() && nums.get(r) + 1 == nums.get(r + 1)) {
                r++;
            }
            
            if (r != l) {
                result.add(nums.get(l) + "-" + nums.get(r));
            } else {
                result.add(String.valueOf(nums.get(l)));
            }
            
            l = r + 1;
            r = r + 1;
        }
        
        return String.join(",", result);
    }
}`,
complexity:`Время: O(n log n), Память: O(n)`,
complexityExpl:`Сортировка O(n log n), один проход группировки O(n). Список строк результата — O(n) памяти.`,
expl:`Сортируем — тогда числа, идущие подряд по числовому ряду, окажутся рядом в массиве. Далее один проход: запоминаем start = nums[i], затем двигаем i вперёд пока nums[i+1] == nums[i] + 1. Когда последовательность прерывается — оформляем диапазон: если start == nums[i] — одиночное число, иначе "start->nums[i]". Добавляем в список и переходим к следующему.`,
lcSimilar:[{"n":228,"t":"Summary Ranges","h":"summary-ranges"}],
repoSimilar:["iss7"]},

{id:"tp9",t:"Удаление смайликов",p:"Two Pointers",d:"легко",
desc:`Удалить из массива символов все вхождения смайликов :-) и :-(. После двоеточия, дефиса и первой скобки (')' или '(') нужно выкинуть и все подряд идущие такие же скобки того же типа (например ":-)))" целиком). Необходимо вернуть целое число w — новую логическую длину массива (сколько символов осталось). Если w = 0, подходящих символов нет.
Что такое in-place
Работать нужно в том же массиве arr, без выделения второго массива под ответ.

Пример:
Ввод: ['a',':','-',')','b']
Вывод: 2 (то есть ['a','b'])

Ввод: [':', '-', ')', ')', ')']
Вывод: [] (w = 0; весь хвост смайлика с повторными скобками удалён)`,
hint:`Указатель записи. Обнаруживаем паттерн :-) или :-(, пропускаем включая повторяющиеся скобки.`,
code:`class Solution {
    public int removeSmileys(char[] arr) {
        int write = 0;
        int read = 0;
        int n = arr.length;

        while (read < n) {
            if (read + 2 < n
                && arr[read] == ':'
                && arr[read + 1] == '-'
                && (arr[read + 2] == ')'
                    || arr[read + 2] == '(')) {

                char bracket = arr[read + 2];
                read += 3;

                while (read < n && arr[read] == bracket) {
                    read++;
                }
            } else {
                arr[write++] = arr[read++];
            }
        }

        return write;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход с пропуском смайликов — O(n). Несколько счётчиков — O(1) памяти.`,
expl:`Обнаруживаем паттерн :- после чего ) или (. Пропускаем смайлик и повторы скобки. Два указателя read/write сжимают массив в начало; возвращаем write. O(n).`,
p2:"Read / Write",
lcSimilar:[{"t":"Remove Invalid Parentheses","h":"remove-invalid-parentheses"},{"t":"Valid Parentheses","h":"valid-parentheses"}]},

{id:"tp10",t:"LC 443. String Compression",p:"Two Pointers",d:"средне",
desc:`==Run-length encode== массива символов. ==Последовательные одинаковые символы== заменить на символ + количество (если > 1).

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Цикл по блокам одинаковых символов — O(n). Запись in-place — O(1) памяти.`,
expl:`Группируем последовательные одинаковые символы. Записываем символ, затем цифры количества (если > 1). Для многозначных чисел записываем каждую цифру отдельно. O(n).`,
p2:"Read / Write"},

{id:"tp11",t:"LC 680. Valid Palindrome II",p:"Two Pointers",d:"средне",
desc:`Можно ли ==удалить не более одного символа==, чтобы строка стала ==палиндромом==?

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
                return isPalin(s, l + 1, r) || isPalin(s, l, r - 1);
            }
            l++;
            r--;
        }
        return true;
    }

    private boolean isPalin(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) return false;
            l++;
            r--;
        }
        return true;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Основной цикл O(n) + isPalin на суффиксе O(n) — итого O(n). Только индексы — O(1) памяти.`,
expl:`Два указателя с краёв. При первом несовпадении проверяем оба варианта: пропустить левый или правый. Если хотя бы один даёт палиндром — true.
Поэтому используем знак ||.
В отдельном методе делаем обычную стандартную проверку на палиндром.`},

{id:"tp12",t:"LC 977. Squares of a Sorted Array",p:"Two Pointers",d:"легко",
desc:`Дан ==отсортированный массив==. Вернуть ==массив квадратов в отсортированном порядке==.

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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один проход двумя указателями — O(n). Массив result — O(n) памяти.`,
expl:`Наибольшие квадраты — на краях массива (отрицательные или положительные). Два указателя сравнивают абсолютные значения, заполняем результат справа налево. O(n).`,
lcSimilar:[{"t":"Squares of a Sorted Array","h":"squares-of-a-sorted-array"},{"t":"Merge Sorted Array","h":"merge-sorted-array"}]},

// ===== UNION-FIND =====
{id:"uf1",t:"Объединение графиков",p:"Union-Find",d:"средне",
desc:`Дан массив графиков, где каждый график — список пар [время, значение], отсортированный по времени. ==Объединить все графики в один==: [время, сумма значений].

Пример:
Ввод: [[[1,2],[3,1]], [[2,3],[4,2]]]
Вывод: [[1,2],[2,5],[3,4],[4,3]]

Объяснение: t=1: 2, t=2: 2+3=5, t=3: 1+3=4, t=4: 1+2=3`,
hint:`Min-heap для событий из всех графиков. Обрабатываем все события с одинаковым временем вместе.`,
code:`public class Solution {
    public List<List<Integer>> merge(List<List<List<Integer>>> graphics) {
        int k = graphics.size();
        int[] currentValues = new int[k];
        long currentSum = 0;
  
        //Хранит массивы int[] из 3 элементов: [время, индекс_графика, индекс_точки]
        PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        for (int i = 0; i < k; i++) {
            var g = graphics.get(i);
            if (g != null && !g.isEmpty()) {
                //Добавляет первую точку каждого графика в кучу
                heap.offer(new int[]{g.get(0).get(0), i, 0});
            }
        }

        List<List<Integer>> result = new ArrayList<>();
        while (!heap.isEmpty()) {
            //Смотрим на вершину кучи (самое раннее время)
            int curTime = heap.peek()[0];

            while (!heap.isEmpty() && heap.peek()[0] == curTime) {
                int[] ev = heap.poll();              // извлекаем [время, индекс_графика, индекс_точки]
                int gi = ev[1], pi = ev[2];         // gi - номер графика, pi - номер точки
                var g = graphics.get(gi);           // получаем график
                int newVal = g.get(pi).get(1);      // новое значение в этой точке
                int oldVal = currentValues[gi];     // текущее значение этого графика

                if (newVal != oldVal) {
                    currentValues[gi] = newVal;
                    currentSum += (long) newVal - oldVal;
                }
                //Если у этого графика есть следующая точка, добавляем ее
                if (pi + 1 < g.size()) {
                    heap.offer(new int[]{g.get(pi + 1).get(0), gi, pi + 1});
                }
            }

            result.add(Arrays.asList(curTime, (int) currentSum));
        }
        return result;
    }
}`,
complexity:`Время: O(N log k), Память: O(k)`,
complexityExpl:`В куче O(k) элементов, всего N извлечений по O(log k) — O(N log k). Куча и currentValues — O(k) памяти.`,
expl:`Min-heap обрабатывает события по времени. Все события одного момента — за раз. Поддерживаем текущие значения каждого графика и их сумму. O(N log k) где N — суммарное число точек.`},

{id:"uf2",t:"Объединение нескольких графиков",p:"Union-Find",d:"средне",
desc:`Дан массив графиков [время, значение]. ==Объединить в один суммарный==.

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
complexity:`Время: O(N log k), Память: O(k)`,
complexityExpl:`Тот же паттерн: N операций с кучей размера k — O(N log k). Куча и vals — O(k) памяти.`,
expl:`Идентичный подход: min-heap обрабатывает события хронологически. Поддерживаем текущую сумму, обновляя при каждом событии. O(N log k).`},

// ===== STRINGS PREFIX =====
{id:"sp1",t:"LC 14 Longest Common Prefix",p:"Strings Prefix",d:"легко",
desc:`Найти самый длинный ==общий префикс== массива строк.

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
                if (i >= strs[j].length() || strs[j].charAt(i) != c) {
                    return strs[0].substring(0, i);
                }
            }
        }

        return strs[0];
    }
}`,
complexity:`Время: O(S), Память: O(1)`,
complexityExpl:`Внешний цикл по позициям, внутренний по строкам — до суммарной длины S. Только индексы — O(1) памяти.`,
expl:`Вертикальное сканирование: внешний цикл по позиции символа, внутренний — по всем строкам. Останавливаемся при первом несовпадении или конце строки. O(S) где S — суммарная длина строк.`},

// ===== WINDOW + DEQUE =====
{id:"swd1",t:"LC 1438 Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit.",p:"Window + Deque",d:"сложно",
desc:`Дан массив целых чисел nums и целое число limit. Вернуть длину наидлиннейшего непрерывного подмассива такого, что абсолютная разность между любыми двумя элементами этого подмассива не превышает limit.

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

        for (int right = 0; right < nums.length; right++) {
            while (!maxD.isEmpty() && nums[maxD.peekLast()] <= nums[right])
                maxD.pollLast();
            maxD.addLast(right);

            while (!minD.isEmpty() && nums[minD.peekLast()] >= nums[right])
                minD.pollLast();
            minD.addLast(right);

            while (nums[maxD.peekFirst()] - nums[minD.peekFirst()] > limit) {
                left++;
                if (maxD.peekFirst() < left) maxD.pollFirst();
                if (minD.peekFirst() < left) minD.pollFirst();
            }

            result = Math.max(result, right - left + 1);
        }

        return result;
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Каждый индекс входит/выходит из деков один раз — O(n) амортизированно. Деки до O(n) элементов — O(n) памяти.`,
expl:`Два монотонных дека: maxD хранит индексы в убывающем порядке значений (голова = максимум окна), minD — в возрастающем (голова = минимум). Когда max - min > limit, сжимаем окно слева. Каждый элемент push/pop один раз → O(n).`,
lcSimilar:[{"t":"Find First and Last Position of Element in Sorted Array","h":"find-first-and-last-position-of-element-in-sorted-array"},{"t":"Binary Search","h":"binary-search"}],
diagram:{"type":"multi","data":[8,2,4,7],"steps":[{"structs":[{"type":"int[]","name":"nums","data":[8,2,4,7],"active":[0]},{"type":"Deque","name":"maxD (убыв.)","data":[8],"hl":[0]},{"type":"Deque","name":"minD (возр.)","data":[8],"hl":[0]}],"desc":"[8]: max=8, min=8, размах=0 ≤ limit"},{"structs":[{"type":"int[]","name":"nums","data":[8,2,4,7],"active":[0,1]},{"type":"Deque","name":"maxD (убыв.)","data":[8,2]},{"type":"Deque","name":"minD (возр.)","data":[2],"hl":[0]}],"desc":"[8,2]: max=8, min=2, размах=6 > limit!"},{"structs":[{"type":"int[]","name":"nums","data":[8,2,4,7],"active":[1,2]},{"type":"Deque","name":"maxD (убыв.)","data":[4],"hl":[0]},{"type":"Deque","name":"minD (возр.)","data":[2,4]}],"desc":"Сжали → [2,4]: max=4, min=2, размах=2 ✓"},{"structs":[{"type":"int[]","name":"nums","data":[8,2,4,7],"active":[2,3]},{"type":"Deque","name":"maxD (убыв.)","data":[7],"hl":[0]},{"type":"Deque","name":"minD (возр.)","data":[4,7],"hl":[0]}],"desc":"[4,7]: max=7, min=4, размах=3. Ответ: 2"}]}},

// ===== DYNAMIC PROGRAMMING =====
{id:"dp1",t:"Longest Palindromic Substring",p:"Dynamic Programming",d:"средне",
desc:`Дана строка s. Найти самую длинную ==подстроку-палиндром==.

Пример:
Ввод: s = "babad"
Вывод: "bab" (или "aba")

Ввод: s = "cbbd"
Вывод: "bb"`,
hint:`Алгоритм Манакера: вставляем разделители между символами, используем массив радиусов палиндромов и зеркальное свойство.`,
code:`class Solution {
    public String longestPalindrome(String s) {
        // Добавляем разделители '#' между символами, а также граничные маркеры '^' и '\$'
        // Это позволяет единообразно обрабатывать чётные и нечётные палиндромы
        // Пример: "bob" -> "^#b#o#b#\$" 
        char[] t = new char[2 * s.length() + 3];  // +3 для '^', '#', '\$'
        t[0] = '^';        // Левая граница (никогда не совпадёт с '#')
        t[1] = '#';        // Начальный разделитель
        for (int i = 0; i < s.length(); i++) {
            t[2 * i + 2] = s.charAt(i);   // Оригинальный символ на чётной позиции
            t[2 * i + 3] = '#';           // Разделитель на нечётной позиции
        }
        t[t.length - 1] = '\$';  // Правая граница (никогда не совпадёт)

        // p[i] = максимальный радиус палиндрома с центром в i
        // Радиус включает сам центр, т.е. полная длина палиндрома = 2*p[i]+1
        int[] p = new int[t.length];
        
        // center - центр текущего палиндрома, right - его правая граница
        int center = 0, right = 0;

        // Пропускаем граничные маркеры (индексы 0 и t.length-1)
        for (int i = 1; i < t.length - 1; i++) { 
            // Ключевая оптимизация: используем зеркальное свойство
            // Зеркальная позиция относительно текущего центра
            int mirror = 2 * center - i;
            
            // Если i находится внутри границы текущего палиндрома,
            // то начальный радиус можно взять из зеркальной позиции
            if (i < right) {
                // Не можем выйти за правую границу, поэтому берём минимум
                p[i] = Math.min(right - i, p[mirror]);
            }
            // Если i вне границы, начинаем с радиуса 0 (значение по умолчанию)

            // Расширяем палиндром от центра i в обе стороны
            // Сравниваем символы, не выходя за границы t
            while (t[i + p[i] + 1] == t[i - p[i] - 1]) {
                p[i]++;  // Увеличиваем радиус, пока символы совпадают
            }

            // Обновляем текущий палиндром, если нашли более правый
            if (i + p[i] > right) {
                center = i;          // Новый центр
                right = i + p[i];    // Новая правая граница
                // КЛЮЧЕВОЕ СВОЙСТВО: right только увеличивается,
                // поэтому алгоритм работает за O(n)
            }
        }

        // ШАГ 4: отдельный проход для поиска максимума среди уже вычисленных значений.
        // Ключевое понимание: в расширенной строке радиус палиндрома равен длине исходного палиндрома в оригинальной строке.
        int maxLen = 0;      // Максимальная длина (в символах расширенной строки)
        int bestCenter = 0;  // Центр максимального палиндрома
        for (int i = 1; i < t.length - 1; i++) {
            if (p[i] > maxLen) {
                maxLen = p[i];      // Радиус = длина в оригинальной строке
                bestCenter = i;     // Запоминаем центр
            }
        }


        // ШАГ 5: ИЗВЛЕЧЕНИЕ ПАЛИНДРОМА ИЗ ОРИГИНАЛЬНОЙ СТРОКИ
        // Формула преобразования индекса из расширенной строки в исходную:
        // start = (bestCenter - maxLen) / 2
        // 
        // Почему? В расширенной строке позиция bestCenter соответствует
        // символу в исходной строке с индексом (bestCenter-1)/2
        // Вычитая радиус, получаем начало палиндрома в расширенной строке,
        // деление на 2 даёт индекс в исходной строке
        int start = (bestCenter - maxLen) / 2;
        return s.substring(start, start + maxLen);
        
        // Временная сложность: O(n), где n = длина исходной строки
        // Пространственная сложность: O(n) для расширенной строки и массива p
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Алгоритм Манакера: один проход, правая граница только растёт — O(n). Массив радиусов — O(n) памяти.`,
expl:`Алгоритм Манакера. Строим расширенную строку с разделителями '#'. Для каждой позиции используем зеркальное свойство: если i внутри правой границы текущего палиндрома, начальный радиус берём из зеркала. Затем расширяем. Итого O(n) за счёт того, что правая граница сдвигается только вправо.`},

// ===== STACK =====
{id:"st6",t:"Скобочная грамматика",p:"Stack",d:"средне",
desc:`(term)[n] — повторить term n раз. ==Вложенность== возможна.

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
        StringBuilder current = new StringBuilder();
        int i = 0;
        
        while (i < s.length()) {
            char c = s.charAt(i);
            
            if (c == '(') {
                // Начинаем новую группу
                strStack.push(current);
                current = new StringBuilder();
                i++;
                
            } else if (c == ')') {
                i++; // переходим после ')'
                
                // Ожидаем '['
                if (i < s.length() && s.charAt(i) == '[') {
                    i++; // пропускаем '['
                }
                
                // Парсим число повторений
                int repeat = 0;
                while (i < s.length() && Character.isDigit(s.charAt(i))) {
                    repeat = repeat * 10 + (s.charAt(i) - '0');
                    i++;
                }
                
                // Пропускаем ']'
                if (i < s.length() && s.charAt(i) == ']') {
                    i++;
                }
                
                // Повторяем текущую строку repeat раз
                String repeated = current.toString();
                StringBuilder prev = strStack.pop();
                for (int r = 0; r < repeat; r++) {
                    prev.append(repeated);
                }
                current = prev;
                
            } else {
                // Обычный символ
                current.append(c);
                i++;
            }
        }
        
        return current.toString();
    }
}`,
complexity:`Время: O(|результат|), Память: O(глубина вложенности)`,
complexityExpl:`Каждый символ обрабатывается константное число раз — O(размер выхода). Стеки глубины вложенности — O(глубина) памяти.`,
expl:`Стек строк хранит накопленные prefix-ы. При открывающей скобке — push текущего контекста и начинаем новую строку. При закрытии ] достаём prefix и повторяем текущую строку n раз. O(n × суммарная длина результата).`,
lcSimilar:[{"t":"lc 394 “Decode String”","h":"lc-394-decode-string"}]},

{id:"st7",t:"LC 341. Flatten Nested List Iterator",p:"Stack",d:"средне",
desc:`Дан вложенный список nestedList. Каждый элемент — либо целое число, либо список, элементы которого тоже могут быть числами или списками.
Реализовать итератор, который возвращает все целые числа в порядке слева направо.

Пример 1:
Ввод: nestedList = [[1,1],2,[1,1]]
Вывод: [1,1,2,1,1]

Пример 2:
Ввод: nestedList = [1,[4,[6]]]
Вывод: [1,4,6]`,
hint:`Стек NestedInteger. В hasNext() раскрывать списки, пока на вершине не окажется число.`,
code:`public class NestedIterator implements Iterator<Integer> {
    private Deque<NestedInteger> stack = new ArrayDeque<>();
 
    //инициализация
    public NestedIterator(List<NestedInteger> nestedList) {
        // Кладём всё в стек в обратном порядке (чтобы сохранить порядок при pop)
        for (int i = nestedList.size() - 1; i >= 0; i--) {
            stack.push(nestedList.get(i));
        }
    }

    public Integer next() {
        return stack.pop().getInteger(); // Берём число с вершины
    }

    public boolean hasNext() {
        // Пока на вершине не число - раскрываем список
        while (!stack.isEmpty() && !stack.peek().isInteger()) {
            NestedInteger top = stack.pop();           // Достаём список
            List<NestedInteger> list = top.getList();
            // Кладём его элементы в обратном порядке
            for (int i = list.size() - 1; i >= 0; i--) {
                stack.push(list.get(i));
            }
        }
        return !stack.isEmpty();
    }
}`,
complexity:`Время: O(n) суммарно, Память: O(n)`,
complexityExpl:`Каждый NestedInteger попадает в стек и извлекается из стека не более одного раза, поэтому суммарно по всем вызовам next/hasNext получаем O(n). Стек может хранить до O(n) элементов.`,
expl:`Кладём стартовый список в стек в обратном порядке, чтобы сохранить левый-to-правый порядок при pop.
Вся "тяжёлая" логика в hasNext(): пока на вершине список, раскрываем его и кладём элементы обратно в обратном порядке. Когда на вершине число, hasNext() возвращает true, а next() просто забирает его.
Такой дизайн ленивый: не нужно флаттенить весь ввод заранее, если итератор используют частично.`,
p2:"Iterator / Lazy",
lcSimilar:[{"n":341,"t":"Flatten Nested List Iterator","h":"flatten-nested-list-iterator"}],
repoSimilar:["st6","tp57"]},

// ===== TWO POINTERS =====
{id:"tp13",t:"LC 1229. Meeting Scheduler",p:"Two Pointers",d:"средне",
desc:`Два человека имеют списки ==свободных интервалов== (отсортированных). Найти ==первый общий слот== длительностью >= duration.

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
complexity:`Время: O(n + m), Память: O(1)`,
complexityExpl:`Два указателя по спискам интервалов — O(n+m). Константная память.`,
expl:`Считаем пересечение: min(end1,end2) - max(start1,start2). Если >= duration — нашли слот. Двигаем указатель, чей интервал заканчивается раньше. O(n+m).`},

// ===== PREFIX SUM EXT. =====
{id:"pse3",t:"Общий префикс без учёта кратности",p:"Prefix Sum Ext.",d:"средне",
desc:`Даны два массива целых чисел nums1 и nums2 одинаковой длины. Для каждого префикса нужно посчитать число общих элементов без учета кратности.
"Без учета кратности" - это значит, что присутствие одного и того же числа в префиксах считается только один раз независимо от количества повторов.

Пример:
A = [1, 2, 2, 3]
B = [2, 1, 1, 4]
Вывод: [0, 2, 2, 2]

`,
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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один цикл с двумя инкрементами в count — O(n). Массив count[n+1] — O(n) памяти.`,
expl:`Массив count[v] хранит, сколько раз число v встречено (в A, в B, или в обоих). Когда count == 2 — число есть в обоих массивах. Не учитываем кратность (число входит максимум 1 раз в каждый массив). O(n).`},

{id:"pse4",t:"Общий префикс с учётом кратности",p:"Prefix Sum Ext.",d:"средне",
desc:`Даны два массива целых чисел nums1 и nums2 одинаковой длины. Для каждого префикса нужно посчитать число общих элементов c учетом кратности.
"С учетом кратности" - это значит, что присутствие одного и того же числа в префиксах считается с учетом наличия дубликатов.

Пример:
Ввод: A = [1,1,2,2], B = [1,2,1,2]
Вывод: [1,1,2,4]`,
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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Константное число операций HashMap на шаг — O(n). Две карты с O(n) ключей — O(n) памяти.`,
expl:`При добавлении A[i]: если countA[v] <= countB[v] (т.е. после инкремента новый min увеличился), то common++. Аналогично для B[i]. O(n) при HashMap.`},

{id:"pse5",t:"Prefix Common Array",p:"Prefix Sum Ext.",d:"средне",
desc:`Даны две перестановки A и B длины n (числа от 1 до n). Найти массив C, где C[i] = ==количество чисел, присутствующих в обоих префиксах== A[0..i] и B[0..i].

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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один проход с обновлением freq — O(n). Массив freq[n+1] — O(n) памяти.`,
expl:`Так как A и B — перестановки, каждое число встречается ровно по 1 разу в каждом. freq[v] считает сколько раз v встретилось суммарно. Когда freq == 2 — число есть и в A[0..i], и в B[0..i]. O(n) время, O(n) память.`},

// ===== TWO POINTERS =====
{id:"tp14",t:"LC 1331. Rank Transform of an Array",p:"Two Pointers",d:"легко",
desc:`Дан массив целых чисел arr (не отсортированный). Заменить каждый элемент его рангом. Ранг — это позиция элемента среди уникальных значений отсортированного массива, начиная с 1.

Пример:
[40, 10, 20, 30] → [4, 1, 2, 3]
[100, 100, 100]  → [1, 1, 1]`,
hint:`Отсортировать уникальные значения, назначить ранги. Или пройти один раз, увеличивая ранг при смене значения.`,
code:`class Solution {
    public int[] arrayRankTransform(int[] arr) {
        // копируем массив чтобы не испортить оригинал при сортировке
        int[] sorted = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            sorted[i] = arr[i];
        }

        // сортируем копию — теперь можем определить порядок значений
        Arrays.sort(sorted);

        // назначаем ранги уникальным значениям по порядку
        Map<Integer, Integer> rank = new HashMap<>();
        int nextRank = 1;
        for (int i = 0; i < arr.length; i++) {
            if (!rank.containsKey(sorted[i])) {
                rank.put(sorted[i], nextRank++);
            }
        }

        // заменяем каждый элемент его рангом
        for (int j = 0; j < arr.length; j++) {
            arr[j] = rank.get(arr[j]);
        }

        return arr;
    }
}`,
complexity:`Время: O(n log n), Память: O(n)`,
complexityExpl:`Сортировка копии O(n log n), построение рангов + второй проход O(n). Копия, карта, результат — O(n) памяти.`,
expl:`Сортируем копию массива. Назначаем ранги уникальным значениям (1, 2, 3, ...). Затем заменяем каждый элемент его рангом. O(n log n).`,
lcSimilar:[{"t":"Remove Invalid Parentheses","h":"remove-invalid-parentheses"},{"t":"Valid Parentheses","h":"valid-parentheses"}],
diagram:{"type":"twoptr","data":[1,1,2,2,2,3],"steps":[{"l":0,"r":0,"desc":"Сжимаем дубликаты"},{"l":0,"r":1,"desc":"1==1, пропускаем"},{"l":1,"r":2,"desc":"2≠1, записываем"},{"l":2,"r":5,"found":[0,1,2],"desc":"Итог: [1,2,3]"}]}},

{id:"ms5",t:"Скалярное произведение векторов",p:"Two Pointers",d:"легко",
desc:`Даны два ==сжатых вектора== vec1 и vec2 ==одинаковой развёрнутой длины== в виде списков пар [value, count]. Например, [3, 3, 3, 7] — это [[3, 3], [7, 1]]. Посчитать ==скалярное произведение== развёрнутых векторов.

Пример 1:
Ввод: vec1 = [[2, 3]], vec2 = [[3, 2], [4, 1]]
Вывод: 20 ([2,2,2] · [3,3,4] = 2·3+2·3+2·4)

Пример 2:
Ввод: vec1 = [[1, 2], [2, 2]], vec2 = [[3, 4]]
Вывод: 18 ([1,1,2,2] · [3,3,3,3])

Пример 3:
Ввод: vec1 = [[5, 1]], vec2 = [[3, 1]]
Вывод: 15`,
hint:`Два указателя по блокам. Пока оба блока не пусты: берём min(остаток слева, остаток справа), добавляем val1*val2*min, вычитаем из обоих счётчиков.`,
code:`import java.util.*;

public class Solution {
    public long dotProduct(List<List<Integer>> vec1, List<List<Integer>> vec2) {
        long result = 0;
        int i = 0, j = 0;
        int cnt1 = 0, cnt2 = 0;
        int val1 = 0, val2 = 0;

        while (i < vec1.size() || j < vec2.size()) {
            if (cnt1 == 0) {
                val1 = vec1.get(i).get(0);
                cnt1 = vec1.get(i).get(1);
                i++;
            }
            if (cnt2 == 0) {
                val2 = vec2.get(j).get(0);
                cnt2 = vec2.get(j).get(1);
                j++;
            }

            int minVal = Math.min(cnt1, cnt2);
            result += (long) val1 * val2 * minVal;
            cnt1 -= minVal;
            cnt2 -= minVal;
        }

        return result;
    }
}`,
complexity:`Время: O(m + k), Память: O(1)`,
complexityExpl:`Каждый блок обрабатываем за O(1), указатели только двигаются вперёд — O(m+k) для m и k сегментов. Константное число переменных — O(1) доп. памяти.`,
expl:`Разворачивать векторы не нужно. На каждом шаге активны val1, val2 и оставшиеся длины cnt1, cnt2; пересечение блоков даёт min(cnt1,cnt2) слагаемых val1*val2. Сумма по шагам — скалярное произведение.`,
lcSimilar:[{"n":1868,"t":"Product of Two Run-Length Encoded Arrays","h":"product-of-two-run-length-encoded-arrays"}]},

{id:"tp52",t:"Подсчёт пар индексов",p:"Two Pointers",d:"средне",
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
complexity:`Время: O(n log n), Память: O(1)`,
complexityExpl:`Сортировка O(n log n), два указателя O(n) — доминирует сортировка. In-place — O(1) доп. памяти.`,
expl:`Сортируем массив. Если nums[l] + nums[r] >= k, то все элементы между l и r в паре с r тоже подойдут (массив отсортирован) → count += (r-l). O(n log n).`},

{id:"tp15",t:"LC 658. Find K Closest Elements",p:"Two Pointers",d:"сложно",
desc:`Дан ==отсортированный массив== arr и два числа k и x. Найти ==k ближайших к x элементов==. Вернуть в отсортированном порядке.

Пример:
Ввод: arr = [1,2,3,4,5], k = 4, x = 3
Вывод: [1,2,3,4]

Ввод: arr = [1,2,3,4,5], k = 4, x = -1
Вывод: [1,2,3,4]`,
hint:`Бинарный поиск начала окна размером k. Сравниваем расстояния x - arr[mid] и arr[mid+k] - x.`,
code:`class Solution {
    //Бинарный поиск начала окна размером k
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        // left и right — возможные позиции НАЧАЛА окна длиной k
        // Окно может начинаться от 0 до arr.length - k (чтобы поместиться)
        int left = 0;
        int right = arr.length - k;
        
        // Бинарный поиск левой границы оптимального окна, остановка когда left==right
        // Сравниваем: выгоднее сдвинуть окно вправо или оставить
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            // Сравниваем расстояния до x:
            // - arr[mid] — левый край ТЕКУЩЕГО окна
            // - arr[mid + k] — левый край СЛЕДУЮЩЕГО окна (сдвиг на 1 вправо)
            // 
            // Если левый край текущего окна ДАЛЬШЕ от x, чем левый край следующего,
            // значит окно нужно сдвинуть вправо (left = mid + 1)
            // Иначе оставляем окно левее (right = mid)
            if (x - arr[mid] > arr[mid + k] - x) {
                left = mid + 1;   // Сдвигаем окно вправо
            } else {
                right = mid;      // Оставляем окно левее
            }
        }
        
        // Собираем результат: k элементов начиная с left
        List<Integer> result = new ArrayList<>();
        for (int i = left; i < left + k; i++) {
            result.add(arr[i]);
        }
        return result;
    }
}`,
complexity:`Время: O(log(n−k) + k), Память: O(k)`,
complexityExpl:`Бинарный поиск по [0, n−k] — O(log(n−k)), затем копируем k элементов. Список из k элементов — O(k) памяти.`,
expl:`Бинарный поиск левой границы окна размером k. Если расстояние до arr[mid] больше, чем до arr[mid+k], сдвигаем окно вправо. O(log(n-k) + k).`,
lcSimilar:[{"t":"Remove Invalid Parentheses","h":"remove-invalid-parentheses"},{"t":"Valid Parentheses","h":"valid-parentheses"}],
repoSimilar:["tp16","tp54"],
diagram:{"type":"bsearch","data":[1,2,3,4,5],"steps":[{"l":0,"r":1,"m":0,"desc":"k=4, x=3. Ищем начало окна"},{"l":0,"r":0,"m":0,"desc":"|3-1|=2 vs |5-3|=2 → right=mid"},{"l":0,"r":0,"m":0,"found":0,"desc":"Окно [1,2,3,4] ✓"}]}},

{id:"tp16",t:"К ближайших чисел",p:"Two Pointers",d:"средне",
desc:`Дан ==отсортированный массив== и число target. Найти ==k ближайших к target чисел==. Если расстояния равны — меньший элемент предпочтительнее.

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
complexity:`Время: O(log n + k), Память: O(k)`,
complexityExpl:`binarySearch O(log n), затем k шагов выбора ближайшего — O(k). Список из k чисел — O(k) памяти.`,
expl:`Бинарный поиск позиции ближайшей к target. Два указателя расходятся от этой позиции: выбираем ближайший из arr[left] и arr[right]. O(log n + k).`,
repoSimilar:["tp15","tp54"]},

{id:"tp17",t:"Минимальная разность",p:"Two Pointers",d:"легко",
desc:`Даны два ==отсортированных массива==. Найти ==минимальную абсолютную разность== между элементами из разных массивов.

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
complexity:`Время: O(n + m), Память: O(1)`,
complexityExpl:`Два указателя по отсортированным массивам — O(n+m). Только переменные — O(1) памяти.`,
expl:`Два указателя на отсортированных массивах. Двигаем указатель на меньший элемент — это приближает значения друг к другу. O(n+m) время, O(1) память.`},

// ===== HASHMAP =====
{id:"hf7",t:"Группировка чисел-анаграмм",p:"HashMap",d:"средне",
desc:`==Сгруппировать== числа, чьи цифры являются ==анаграммами== друг друга.

Пример:
Ввод: [123, 321, 213, 45, 54, 100]
Вывод: [[123, 321, 213], [45, 54], [100]]

Ввод: [11, 22, 11]
Вывод: [[11, 11], [22]]`,
hint:`Ключ в HashMap — отсортированные цифры числа. Группируем числа с одинаковым ключом.`,
code:`class Solution {
    public List<List<Integer>> groupAnagramNumbers(int[] nums) {
        Map<String, List<Integer>> map = new HashMap<>();
        for (int num : nums) {
            char[] digits = String.valueOf(num).toCharArray();
            Arrays.sort(digits);

            String key = new String(digits);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(num);
        }

        return new ArrayList<>(map.values());
    }
}`,
code2:`//Эта версия работает за O(n × d) без log-фактора
public List<List<Integer>> groupAnagrams(int[] nums) {
    Map<String, List<Integer>> map = new HashMap<>();
    
    for (int num : nums) {
        // Подсчёт частоты цифр (0-9)
        int[] freq = new int[10];
        int n = num;
        while (n > 0) {
            freq[n % 10]++;
            n /= 10;
        }
        
        // Строим ключ из частот
        StringBuilder key = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            key.append('#').append(freq[i]);
        }
        
        map.computeIfAbsent(key.toString(), k -> new ArrayList<>()).add(num);
    }
    
    return new ArrayList<>(map.values());
}`,
complexity:`Время: O(n · d log d), Память: O(n)`,
complexityExpl:`Для каждого числа сортируем d цифр O(d log d) и кладём в HashMap — O(n·d log d). Карта и списки — O(n) памяти.`,
expl:`Для каждого числа сортируем его цифры — это ключ в HashMap. Числа с одинаковым ключом — анаграммы. O(n × d log d), где d — кол-во цифр.`},

{id:"tp18",t:"Односторонняя разница",p:"HashMap",d:"легко",
desc:`Дан массив и число k >= 0. Посчитать ==количество пар== (i, j), где i < j и nums[j] - nums[i] == k.

Пример:
Ввод: nums = [1, 2, 3, 4, 5], k = 2
Вывод: 3 (пары: (1,3), (2,4), (3,5))

Ввод: nums = [1, 1, 1], k = 0
Вывод: 3`,
hint:`Идём слева направо, ведём HashMap частот. Для каждого num считаем, сколько раз (num − k) уже встречалось — столько новых пар.`,
code:`class Solution {
    public int findPairs(int[] nums, int k) {
        if (k < 0) {
          return 0;
        }

        Map<Integer, Integer> freq = new HashMap<>();
        int count = 0;
        for (int num : nums) {
            // сколько раз num-k уже встречался — столько новых пар
            count += freq.getOrDefault(num - k, 0);
            freq.put(num, freq.getOrDefault(num, 0) + 1);
        }

        return count;
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один проход по массиву — O(n). HashMap занимает O(n) памяти.`,
expl:`Ведём HashMap частот и идём слева направо. Для каждого num проверяем, сколько раз (num − k) уже встречалось в map — столько новых пар с нужной разностью. После подсчёта добавляем num в map. Это корректно: i < j гарантируется порядком обхода. Работает и при k == 0 (ищем дубликаты num — 0 = num). O(n) время, O(n) память.`,
lcSimilar:[{"t":"K-diff Pairs in an Array","h":"k-diff-pairs-in-an-array"},{"t":"Two Sum II - Input Array Is Sorted","h":"two-sum-ii-input-array-is-sorted"}]},

// ===== TWO POINTERS =====
{id:"tp19",t:"Подсчёт пар с разницей >= К",p:"Two Pointers",d:"средне",
desc:`Дан массив nums и число k. Посчитать ==количество пар== (i, j), где i < j и |nums[i] - nums[j]| >= k.

Пример:
Ввод: nums = [1, 3, 7, 2], k = 4
Вывод: 3 (пары: (1,7), (3,7), (7,2) → разницы: 6, 4, 5)

Ввод: nums = [1, 5, 3, 9], k = 5
Вывод: 3`,
hint:`Сортируем. Для каждого right двигаем left вправо, пока nums[right] - nums[left] >= k. Тогда count += left — все индексы 0..left-1 образуют валидные пары с right.`,
code:`class Solution {
    public long countPairs(int[] nums, int k) {
        int n = nums.length;
        if (n < 2) return 0;
        
        // Если k <= 0, любая пара подходит
        if (k <= 0) {
            return (long) n * (n - 1) / 2;
        }
        
        Arrays.sort(nums);
        
        long count = 0;
        int left = 0;
        
        for (int right = 0; right < n; right++) {
            // Находим первый индекс, где nums[right] - nums[left] < k
            while (left < right && nums[right] - nums[left] >= k) {
                left++;
            }
            // Все индексы от 0 до left-1 образуют пары с right
            count += left;
        }
        
        return count;
    }
}`,
complexity:`Время: O(n log n), Память: O(1)`,
complexityExpl:`Сортировка — O(n log n). Затем два указателя: right проходит массив, left только растёт — итого O(n). Итого O(n log n). Память O(1).`,
expl:`Сортируем массив. Фиксируем указатель left = 0. Для каждого right двигаем left вправо, пока nums[right] - nums[left] >= k — left движется к первому невалидному индексу. Все элементы с индексами 0..left-1 имеют разность >= k с nums[right], поэтому count += left. Поскольку массив отсортирован и left не откатывается назад — два указателя работают корректно.`},

// ===== GREEDY WITH MIN TRACKER =====
{id:"tp20",t:"Рост акций компании",p:"Greedy with Min Tracker",d:"средне",
desc:`Дан массив цен акций по дням. Найти ==максимальную прибыль от одной покупки и одной продажи== (купить раньше, продать позже).

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход по ценам с minPrice — O(n). Только переменные — O(1) памяти.`,
expl:`Один проход: отслеживаем минимальную цену. Для каждого дня — потенциальная прибыль = price - minPrice. Обновляем максимум. O(n) время, O(1) память.`},

// ===== TWO POINTERS =====
{id:"tp21",t:"URL-ификация строки",p:"Two Pointers",d:"средне",
desc:`==Заменить все пробелы== в строке на "%20". Дана строка с дополнительным местом в конце и реальная длина.

Пример:
Ввод: "Mr John Smith    ", trueLength = 13
Вывод: "Mr%20John%20Smith"

Ввод: "hello world  ", trueLength = 11
Вывод: "hello%20world"`,
hint:`Считаем пробелы → вычисляем новую длину. Два указателя с конца: копируем символы или записываем %20.`,
code:`class Solution {
    public String urlify(char[] str, int trueLength) {
        // Считаем количество пробелов
        int spaceCount = 0;
        for (int read = 0; read < trueLength; read++) {
            if (str[read] == ' ') spaceCount++;
        }

        // Новая длина после замены (' ' → '%20')
        int newLen = trueLength + spaceCount * 2;
        int write = newLen - 1;  // указатель записи (с конца)

        // Идём с конца строки (read указывает на последний реальный символ)
        for (int read = trueLength - 1; read >= 0; read--) {
            if (str[read] == ' ') {
                str[write--] = '0';
                str[write--] = '2';
                str[write--] = '%';
            } else {
                str[write--] = str[read];
            }
        }

        return new String(str, 0, newLen);
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Два прохода: подсчёт пробелов + заполнение с конца — O(n). In-place в char[] — O(1) доп. памяти.`,
expl:`Два прохода: считаем пробелы, затем заполняем с конца. Каждый пробел заменяется на '%20' (3 символа вместо 1). O(n) время, O(1) дополнительная память.`,
p2:"Read / Write",
lcSimilar:[{"t":"Remove Invalid Parentheses","h":"remove-invalid-parentheses"},{"t":"Valid Parentheses","h":"valid-parentheses"}],
diagram:{"type":"twoptr","data":["M","r"," ","S","m","i","t","h"," "," "," "," "],"steps":[{"l":7,"r":11,"desc":"Mr Smith → заполняем с конца"},{"l":2,"r":7,"desc":"Пробел → %20"},{"l":0,"r":4,"found":[0,1,2,3,4],"desc":"Итог: Mr%20Smith"}]}},

{id:"tp22",t:"LC 11. Container With Most Water",p:"Two Pointers",d:"средне",
desc:`Дан массив heights. Найти ==два столбца==, которые вместе с осью X образуют ==контейнер с наибольшим количеством воды==.

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
            int water = Math.min(height[left], height[right]) * (right - left);
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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Два указателя с краёв: двигаем меньшую стенку — O(n). Константная доп. память.`,
expl:`Жадный подход с двумя указателями. Сдвигаем меньший столбец — сдвиг большего не может увеличить площадь (высота ограничена меньшим). O(n) время, O(1) память.`},

{id:"tp23",t:"Выпилить смайлики из текста",p:"Two Pointers",d:"средне",
desc:`Удалить все смайлики из строки. Смайлик — последовательность: двоеточие, минус, одна или несколько ==скобок== ) или (.

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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один проход с пропуском смайликов — O(n). Буфер char[] — O(n) памяти.`,
expl:`Указатель записи w. При обнаружении паттерна ':' + '-' + скобки — пропускаем весь смайлик (включая повторяющиеся скобки). Иначе копируем символ. O(n).`,
p2:"Read / Write"},

// ===== TREES / DFS =====
{id:"tr5",t:"Поиск ближайшего значения в BST",p:"Trees / DFS",d:"средне",
desc:`Дан корень BST и вещественное число target (double). Найти ==значение узла, ближайшее к target==.

Пример 1:
Ввод: root = [10, 5, 11, -2, 7, null, 15], target = 6.0
       10
      /  \\
     5    11
    / \\     \\
  -2   7    15
Вывод: 5
Пояснение: |5 - 6.0| = 1.0, |7 - 6.0| = 1.0, при равном расстоянии возвращаем меньшее

Пример 2:
Ввод: root = [4, 2, 5, 1, 3], target = 3.7
    4
   / \\
  2   5
 / \\
1   3
Вывод: 4
Пояснение: |4 - 3.7| = 0.3, |3 - 3.7| = 0.7

Пример 3:
Ввод: root = [1], target = 4.5
Вывод: 1

Ограничения:
- Количество узлов: [1, 10⁴]
- Дерево является валидным BST`,
hint:`Спускаемся по BST: если target < node.val — идём влево, иначе вправо. На каждом шаге обновляем ближайший.`,
code:`class Solution {
    public int closestValue(TreeNode root, double target) {
        int closest = root.val;

        while (root != null) {
            if (Math.abs(root.val - target) < Math.abs(closest - target)) {
                closest = root.val;
            }

            root = target < root.val ? root.left : root.right;
        }

        return closest;
    }
}`,
complexity:`Время: O(h), Память: O(1)`,
complexityExpl:`Спуск по BST от корня к листу — O(h). Один указатель и closest — O(1) памяти.`,
expl:`Итеративный спуск по BST. На каждом шаге обновляем closest, если текущий узел ближе к target. Идём влево если target < val, иначе вправо. O(h) время, O(1) память.`,
p2:"BST Search Pattern"},

{id:"tr17",t:"LC 938. Range Sum of BST",p:"Trees / DFS",d:"легко",
desc:`Дан корень бинарного дерева поиска и два целых числа low и high. Вернуть сумму значений всех узлов, значение которых входит в диапазон [low, high] включительно.

Пример:
Ввод: root = [10,5,15,3,7,null,18], low = 7, high = 15
Вывод: 32
Объяснение: 7 + 10 + 15 = 32

Ввод: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
Вывод: 23`,
hint:`Используем BST-отсечения: если val < low — всё слева меньше low, идём только вправо; если val > high — идём только влево.`,
code:`class Solution {
    public int rangeSumBST(TreeNode root, int low, int high) {
        if (root == null) return 0;
        if (root.val < low) return rangeSumBST(root.right, low, high);
        if (root.val > high) return rangeSumBST(root.left, low, high);
        return root.val
            + rangeSumBST(root.left, low, high)
            + rangeSumBST(root.right, low, high);
    }
}`,
complexity:`Время: O(n) в худшем случае, Память: O(h)`,
complexityExpl:`В худшем случае посещаем все узлы — O(n). Глубина рекурсии равна высоте дерева h, поэтому стек вызовов — O(h). За счёт отсечения веток на сбалансированном BST обычно быстрее полного обхода.`,
expl:`Ключ — использовать свойство BST. Если root.val < low, весь левый subtree тоже меньше low и его можно пропустить. Если root.val > high, весь правый subtree больше high и тоже отсекается. Иначе текущий узел входит в ответ, рекурсивно считаем обе стороны.`,
lcSimilar:[{"n":938,"t":"Range Sum of BST","h":"range-sum-of-bst"}],
repoSimilar:["tr3","tr5"]},

{id:"tr18",t:"LC 124. Binary Tree Maximum Path Sum",p:"Trees / DFS",d:"сложно",
desc:`Путь в бинарном дереве — последовательность узлов, где каждые два соседних соединены ребром, и каждый узел встречается не более одного раза. Путь не обязан проходить через корень.
Вернуть ==максимальную сумму пути== в дереве.

Пример:
Ввод: root = [1,2,3]
Вывод: 6
Объяснение: путь 2 -> 1 -> 3

Ввод: root = [-10,9,20,null,null,15,7]
Вывод: 42
Объяснение: путь 15 -> 20 -> 7`,
hint:`DFS возвращает вклад узла в путь родителя (только одна ветка). Глобально обновляем максимум через текущий узел с обеими ветками.`,
code:`class Solution {
    private int maxSum = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        dfs(root);
        return maxSum;
    }

    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int left = Math.max(0, dfs(node.left));
        int right = Math.max(0, dfs(node.right));
        maxSum = Math.max(maxSum, node.val + left + right);
        return node.val + Math.max(left, right);
    }
}`,
complexity:`Время: O(n), Память: O(h)`,
complexityExpl:`Каждый узел посещается один раз — O(n). Дополнительная память определяется глубиной рекурсии h (высота дерева), поэтому O(h).`,
expl:`Критичное разделение:
1) Что возвращает dfs: вклад узла в путь родителя, поэтому можно взять только одну сторону — node.val + max(left, right).
2) Что обновляет maxSum: лучший путь с "вершиной" в текущем узле, где можно взять обе стороны — node.val + left + right.
Отрицательные ветки отсекаем через Math.max(0, ...), чтобы не ухудшать сумму.`,
lcSimilar:[{"n":124,"t":"Binary Tree Maximum Path Sum","h":"binary-tree-maximum-path-sum"}],
repoSimilar:["tr14","tr17"]},

// ===== TREES / BFS =====
{id:"tr6",t:"LC 103 · Binary Tree Zigzag Level Order Traversal",p:"Trees / BFS",d:"легко",
desc:`Дан корень бинарного дерева. Вернуть ==зигзагообразный обход по уровням==: чётные уровни слева направо, нечётные — справа налево.

Пример 1:
Ввод: root = [1, 2, 3, 4, 5, null, 6]
    1
   / \\
  2   3
 / \\   \\
4   5   6
Вывод: [[1], [3, 2], [4, 5, 6]]

Пример 2:
Ввод: root = [3, 9, 20, null, null, 15, 7]
    3
   / \\
  9  20
    /  \\
   15   7
Вывод: [[3], [20, 9], [15, 7]]

Пример 3:
Ввод: root = [1]
Вывод: [[1]]

Ограничения:
- Количество узлов: [0, 2000]
- -100 ≤ Node.val ≤ 100`,
hint:`BFS с очередью. На чётных уровнях добавляем в конец списка, на нечётных — в начало (или reverse).`,
code:`class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        boolean leftToRight = true;

        while (!queue.isEmpty()) {
            int size = queue.size();
            LinkedList<Integer> level = new LinkedList<>();

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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`BFS по уровням: каждый узел один раз — O(n). Очередь и списки — O(n) памяти.`,
expl:`BFS по уровням. Чередуем направление: чётные уровни — addLast, нечётные — addFirst (LinkedList как deque). O(n) время и память.`,
lcSimilar:[{"t":"Find First and Last Position of Element in Sorted Array","h":"find-first-and-last-position-of-element-in-sorted-array"},{"t":"Binary Search","h":"binary-search"}],
diagram:{"type":"tree","data":[1,2,3,4,5,null,6],"steps":[{"active":[0],"visited":[],"desc":"Уровень 0: [1] →"},{"active":[1,2],"visited":[0],"desc":"Уровень 1: [3,2] ←"},{"active":[3,4,6],"visited":[0,1,2],"desc":"Уровень 2: [4,5,6] →"},{"active":[],"visited":[0,1,2,3,4,6],"desc":"Итог: [[1],[3,2],[4,5,6]]"}]}},

// ===== TREES / DFS =====
{id:"tr7",t:"LC 100 Same Tree",p:"Trees / DFS",d:"легко",
desc:`Даны корни двух бинарных деревьев p и q. Проверить, являются ли они ==одинаковыми== (совпадают ==структура и все значения узлов==).

Пример 1:
Ввод: p = [1, 2, 3], q = [1, 2, 3]
  1       1
 / \\     / \\
2   3   2   3
Вывод: true

Пример 2:
Ввод: p = [1, 2], q = [1, null, 2]
  1       1
 /         \\
2           2
Вывод: false

Пример 3:
Ввод: p = [1, 2, 1], q = [1, 1, 2]
Вывод: false

Ограничения:
- Количество узлов: [0, 100]
- -10⁴ ≤ Node.val ≤ 10⁴`,
hint:`Рекурсивно сравниваем: оба null → true, один null → false, значения разные → false. Иначе проверяем детей.`,
code:`class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        // оба узла пусты — поддеревья одинаковы
        if (p == null && q == null) return true;
        // один пуст, другой нет — структура различается
        if (p == null || q == null) return false;
        // значения узлов различаются
        if (p.val != q.val) return false;

        // рекурсивно проверяем левые и правые поддеревья
        return isSameTree(p.left, q.left)
            && isSameTree(p.right, q.right);
    }
}`,
complexity:`Время: O(n), Память: O(h)`,
complexityExpl:`Рекурсивное сравнение: каждый узел один раз — O(n). Стек рекурсии — O(h) памяти.`,
expl:`Рекурсия: базовые случаи — оба null (true), один null (false), значения разные (false). Иначе рекурсивно проверяем левые и правые поддеревья. O(n) время, O(h) стек.`,
p2:"Preorder",
lcSimilar:[{"n":100,"t":"Same Tree","h":"same-tree"}]},

{id:"tr8",t:"LC 110 Balanced Binary Tree",p:"Trees / DFS",d:"легко",
desc:`Дан корень бинарного дерева. Проверить, является ли оно ==сбалансированным по высоте==. Дерево сбалансировано, если для каждого узла разница высот левого и правого поддеревьев не превышает 1.

Пример 1:
Ввод: root = [3, 9, 20, null, null, 15, 7]
    3
   / \\
  9  20
    /  \\
   15   7
Вывод: true

Пример 2:
Ввод: root = [1, 2, 2, 3, 3, null, null, 4, 4]
      1
     / \\
    2   2
   / \\
  3   3
 / \\
4   4
Вывод: false

Пример 3:
Ввод: root = []
Вывод: true

Ограничения:
- Количество узлов: [0, 5000]
- -10⁴ ≤ Node.val ≤ 10⁴`,
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
complexity:`Время: O(n), Память: O(h)`,
complexityExpl:`Для каждого узла считаем высоту с ранним выходом — O(n). Стек рекурсии — O(h) памяти.`,
expl:`Возвращаем -1 как сигнал несбалансированности. Для каждого узла проверяем |leftH - rightH| <= 1. Рано прерываемся при -1. O(n) время, O(h) стек.`,
lcSimilar:[{"t":"LC 110 · Balanced Binary Tree","h":"lc-110-balanced-binary-tree"}]},

{id:"tr9",t:"Path Sum II",p:"Trees / DFS",d:"средне",
desc:`Дан корень бинарного дерева и целое число targetSum. Найти все ==пути от корня до листа==, где ==сумма значений узлов равна targetSum==. Путь — последовательность узлов от корня до листа.

Пример 1:
Ввод: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
       5
      / \\
     4   8
    /   / \\
   11  13  4
  /  \\    / \\
 7    2  5   1
Вывод: [[5,4,11,2], [5,8,4,5]]

Пример 2:
Ввод: root = [1, 2, 3], targetSum = 5
Вывод: []

Пример 3:
Ввод: root = [1, 2], targetSum = 1
Вывод: [] (нет пути до листа с суммой 1)

Ограничения:
- Количество узлов: [0, 5000]
- -1000 ≤ Node.val ≤ 1000
- -1000 ≤ targetSum ≤ 1000`,
hint:`DFS с backtracking: добавляем узел в путь, при листе проверяем сумму, при возврате удаляем последний.`,
code:`class Solution {
    private List<List<Integer>> result = new ArrayList<>();

    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        dfs(root, targetSum, new ArrayList<>());
        return result;
    }

    private void dfs(TreeNode node, int remaining, List<Integer> path) {
        if (node == null) return;

        path.add(node.val);
        remaining -= node.val;

        if (node.left == null && node.right == null && remaining == 0) {
            result.add(new ArrayList<>(path));
        } else {
            dfs(node.left, remaining, path);
            dfs(node.right, remaining, path);
        }

        path.remove(path.size() - 1);
    }
}`,
complexity:`Время: O(n), Память: O(h)`,
complexityExpl:`DFS с backtracking обходит дерево за O(n). Путь длины h и стек — O(h) памяти.`,
expl:`DFS + backtracking. На каждом узле: добавляем в путь, вычитаем из remaining. На листе: если remaining == 0 — нашли путь. При возврате удаляем последний элемент. O(n) обход, O(n²) для копирования путей.`},

{id:"tr10",t:"Lowest Common Ancestor III",p:"Trees / DFS",d:"средне",
desc:`Дан корень бинарного дерева и два узла p и q. Найти их ==наименьшего общего предка (LCA)==. Узлы p и q могут отсутствовать в дереве — в этом случае вернуть null.

LCA — самый глубокий узел, являющийся предком обоих p и q (узел считается предком самого себя).

Пример 1:
Ввод: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1
        3
       / \\
      5   1
     / \\ / \\
    6  2 0  8
      / \\
     7   4
Вывод: 3

Пример 2:
Ввод: root = [3, 5, 1, 6, 2, 0, 8], p = 5, q = 4
Вывод: null (узел 4 отсутствует в дереве)

Пример 3:
Ввод: root = [3, 5, 1], p = 5, q = 1
Вывод: 3

Ограничения:
- Количество узлов: [1, 10⁴]
- Значения узлов уникальны
- p и q различны`,
hint:`DFS возвращает найденный узел. Если оба найдены в разных поддеревьях — текущий узел и есть LCA. Дополнительно проверяем, что оба узла найдены.`,
code:`class Solution {

    // флаги: нашли ли вообще узлы p и q в дереве
    private boolean foundP = false;
    private boolean foundQ = false;

    public TreeNode lowestCommonAncestor(
            TreeNode root, TreeNode p, TreeNode q) {

        // пытаемся найти LCA через DFS
        TreeNode lca = dfs(root, p, q);

        /**
         * важно:
         * если хотя бы один узел отсутствует в дереве,
         * LCA не существует → возвращаем null
         */
        return (foundP && foundQ) ? lca : null;
    }

    private TreeNode dfs(TreeNode node,
                         TreeNode p, TreeNode q) {

        // базовый случай
        if (node == null) return null;

        /**
         * рекурсивно ищем в левом и правом поддеревьях
         */
        TreeNode left = dfs(node.left, p, q);
        TreeNode right = dfs(node.right, p, q);

        /**
         * если текущий узел = p → помечаем и возвращаем его
         */
        if (node == p) {
            foundP = true;
            return node;
        }

        /**
         * если текущий узел = q → помечаем и возвращаем его
         */
        if (node == q) {
            foundQ = true;
            return node;
        }

        /**
         * если p и q нашлись в разных поддеревьях
         * (один слева, другой справа),
         * текущий узел — их LCA
         */
        if (left != null && right != null)
            return node;

        /**
         * иначе:
         * - либо нашли что-то только слева
         * - либо только справа
         * - либо вообще ничего
         *
         * просто пробрасываем найденный узел вверх
         */
        return left != null ? left : right;
    }
}`,
complexity:`Время: O(n), Память: O(h)`,
complexityExpl:`Один DFS: каждый узел константное число раз — O(n). Стек рекурсии — O(h) памяти.`,
expl:`DFS обходит всё дерево (не останавливается рано). Флаги foundP/foundQ подтверждают, что оба узла найдены. Если один в левом поддереве, другой в правом — текущий узел = LCA. O(n).`},

{id:"tr11",t:"652 Find Duplicate Subtrees",p:"Trees / DFS",d:"средне",
desc:`Дан корень бинарного дерева. Найти все ==повторяющиеся поддеревья==. Два поддерева дублируются, если имеют одинаковую структуру и значения узлов. Вернуть корневые узлы всех дубликатов (по одному на каждую группу).

Пример 1:
Ввод: root = [1, 2, 3, 4, null, 2, 4, null, null, 4]
    1
   / \\
  2   3
 /   / \\
4   2   4
   /
  4
Вывод: [[2, 4], [4]]
Пояснение: поддерево "4" встречается 3 раза, поддерево "2→4" встречается 2 раза

Пример 2:
Ввод: root = [2, 1, 1]
  2
 / \\
1   1
Вывод: [[1]]

Ограничения:
- Количество узлов: [1, 5000]
- -200 ≤ Node.val ≤ 200`,
hint:`Сериализуем каждое поддерево в строку. HashMap считает количество одинаковых сериализаций.`,
code:`class Solution {
    private Map<String, Integer> ids = new HashMap<>();
    private Map<Integer, Integer> count = new HashMap<>();
    private List<TreeNode> result = new ArrayList<>();
    private int serial = 1;
    
    public List<TreeNode> findDuplicateSubtrees(TreeNode root) {
        dfs(root);
        return result;
    }
    
    private int dfs(TreeNode node) {
        if (node == null) return 0;
        
        int left = dfs(node.left);
        int right = dfs(node.right);
        
        // Ключ из значения и ID поддеревьев
        String key = node.val + " " + left + " " + right;
        
        int id = ids.computeIfAbsent(key, k -> serial++);
        int cnt = count.merge(id, 1, Integer::sum);
        
        if (cnt == 2) {
            result.add(node);
        }
        
        return id;
    }
}`,
complexity:`Время: O(n²), Память: O(n²)`,
complexityExpl:`Для каждого узла строим строку поддерева — наивная склейка даёт O(n²). HashMap до n ключей — O(n²) памяти.`,
expl:`Сериализуем каждое поддерево в строку (preorder). HashMap считает вхождения каждой сериализации. При count == 2 — добавляем в результат (ровно один раз). O(n²) из-за конкатенации строк.`},

{id:"tr12",t:"Поиск k-ого наибольшего в BST",p:"Trees / DFS",d:"средне",
desc:`Дан корень BST и число k. Найти ==k-й наибольший элемент== в дереве (1-indexed).

Пример 1:
Ввод: root = [5, 3, 6, 2, 4, null, null, 1], k = 3
      5
     / \\
    3   6
   / \\
  2   4
 /
1
Reverse inorder: 6, 5, 4, 3, 2, 1
Вывод: 4

Пример 2:
Ввод: root = [3, 1, 4, null, 2], k = 1
    3
   / \\
  1   4
   \\
    2
Вывод: 4 (максимальный элемент)

Ограничения:
- Количество узлов: [1, 10⁴]
- 1 ≤ k ≤ количество узлов
- Дерево является валидным BST`,
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
complexity:`Время: O(h + k), Память: O(h)`,
complexityExpl:`Обратный inorder: h шагов вниз + k шагов — O(h+k). Стек рекурсии — O(h) памяти.`,
expl:`Обратный inorder-обход (right → node → left) выдаёт элементы BST в убывающем порядке. Останавливаемся на k-м элементе. O(H + k) время.`},

{id:"tr13",t:"Проверка всех листьев",p:"Trees / DFS",d:"легко",
desc:`Дан корень бинарного дерева. Проверить, что ==все листья находятся на одной глубине==.

Пример 1:
Ввод: root = [1, 2, 3, 4, 5, null, 6]
    1
   / \\
  2   3
 / \\   \\
4   5   6
Вывод: true
Пояснение: все листья (4, 5, 6) на глубине 2

Пример 2:
Ввод: root = [1, 2, 3, 4]
    1
   / \\
  2   3
 /
4
Вывод: false
Пояснение: лист 3 на глубине 1, лист 4 на глубине 2

Пример 3:
Ввод: root = [1]
Вывод: true (единственный лист — корень)

Ограничения:
- Количество узлов: [1, 10⁴]`,
hint:`DFS, запоминаем глубину первого листа. Все остальные листья должны иметь ту же глубину.`,
code:`class Solution {
    private int leafDepth = -1;

    public boolean checkLeaves(TreeNode root) {
        return dfs(root, 0);
    }

    private boolean dfs(TreeNode node, int depth) {
        if (node == null) return true;

        if (node.left == null && node.right == null) {
            if (leafDepth == -1) {
                leafDepth = depth;
            }
            return depth == leafDepth;
        }

        return dfs(node.left, depth + 1)
            && dfs(node.right, depth + 1);
    }
}`,
complexity:`Время: O(n), Память: O(h)`,
complexityExpl:`DFS посещает каждый узел и сравнивает глубину листьев — O(n). Стек рекурсии — O(h) памяти.`,
expl:`DFS с отслеживанием глубины. Первый лист задаёт эталонную глубину. Все остальные листья должны совпадать. O(n) время, O(h) стек.`},

{id:"tr14",t:"Сумма от корня до листа",p:"Trees / DFS",d:"средне",
desc:`Дан корень бинарного дерева, где каждый узел содержит цифру от 0 до 9. Каждый ==путь от корня до листа== формирует число (корень — старший разряд). Найти ==сумму всех чисел==, образованных путями от корня до листьев.

Пример 1:
Ввод: root = [1, 2, 3]
    1
   / \\
  2   3
Вывод: 25
Пояснение: числа 12 + 13 = 25

Пример 2:
Ввод: root = [4, 9, 0, 5, 1]
    4
   / \\
  9   0
 / \\
5   1
Вывод: 1026
Пояснение: числа 495 + 491 + 40 = 1026

Ограничения:
- Количество узлов: [1, 1000]
- 0 ≤ Node.val ≤ 9
- Глубина дерева ≤ 10`,
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
complexity:`Время: O(n), Память: O(h)`,
complexityExpl:`DFS передаёт число по пути, суммирует на листьях — O(n). Стек — O(h) памяти.`,
expl:`DFS: на каждом узле формируем число currentNum * 10 + val. На листе возвращаем число. Суммируем все пути. O(n) время, O(h) стек.`},

{id:"tr15",t:"Эквивалентные поддеревья по множеству букв",p:"Trees / DFS",d:"средне",
desc:`Дано бинарное дерево, в каждой вершине которого записана одна буква A–Z.
Две вершины считаются эквивалентными, если поддеревья этих вершин содержат ==одинаковое множество букв== (без учёта частот).
Найти любую пару эквивалентных вершин.

Пример:
\`\`\`
        A
       / \\
      C   B
     / \\ / \\
    A  D A  D
   /         \\
  B            C
\`\`\`

Структура:
class TNode {
    char value = '\\0'; // [A-Z]
    TNode left = null;
    TNode right = null;
}

Сигнатура:
Pair<TNode, TNode> findEquivalentSubtrees(TNode root)`,
hint:`Для каждой вершины посчитай ==битовую маску== букв в поддереве (26 бит, OR детей + бит текущей буквы). Если две вершины дали одинаковую маску — это ответ. Храни \`Map<Integer, TNode>\`.`,
code:`import java.util.HashMap;
import java.util.Map;

public class Solution {

    public Pair<TNode, TNode> findEquivalentSubtrees(TNode root) {
        if (root == null) return null;
        Map<Integer, TNode> seen = new HashMap<>();
        Holder holder = new Holder();
        dfsMask(root, seen, holder);
        return holder.answer;
    }

    private int dfsMask(TNode node,
                        Map<Integer, TNode> seen,
                        Holder holder) {
        if (node == null) return 0;

        int left  = dfsMask(node.left,  seen, holder);
        if (holder.answer != null) return 0;
        int right = dfsMask(node.right, seen, holder);
        if (holder.answer != null) return 0;

        int mask = left | right | (1 << (node.value - 'A'));

        //положить, если отсутствует, и вернуть предыдущее значение
        TNode prev = seen.putIfAbsent(mask, node);
        if (prev != null) {
            holder.answer = new Pair<>(prev, node);
        }
        return mask;
    }

    private static class Holder {
        Pair<TNode, TNode> answer = null;
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один DFS по всем n узлам. HashMap хранит не более n масок. Битовые операции O(1) (маска 26 бит — int).`,
expl:`Каждое поддерево кодируется 26-битной маской (OR масок детей + бит своей буквы). Маска = «набор уникальных букв». Храним первый встреченный узел с каждой маской в HashMap. При повторе — возвращаем пару. Ранний выход через Holder обрывает рекурсию.`},

{id:"tr16",t:"Эквивалентные поддеревья максимального суммарного размера",p:"Trees / DFS",d:"сложно",
desc:`Дан корень бинарного дерева, в каждой вершине которого записана одна буква A–Z.
Найти две вершины, поддеревья которых содержат ==одинаковое множество букв== (без учёта частот) и при этом ==сумма количества вершин в этих двух поддеревьях максимальна==. Вернуть корни найденных поддеревьев.

Пример 1:
Ввод: root = [A,B,E,D,E,B,null,F,null,null,null,D,F]
Вывод: [B, E] (или [E, B])

Пример 2:
Ввод: root = [A,A,A,A]
Вывод: [A, A]
Объяснение: одна вершина может находиться в поддереве другой

Пример 3:
Ввод: root = [A,B,C]
Вывод: [null, null] — если ответ не найден

Ограничения:
- Число узлов >= 1
- Высота дерева <= 1000`,
hint:`DFS: для каждого узла считай ==битовую маску== букв и ==размер поддерева==. В \`Map<mask → (узел, размер)>\` храни ==наибольшее поддерево== с данной маской. При совпадении маски — проверь, не побита ли рекордная сумма размеров.`,
code:`public class Solution {
    private static final int MASK = 0;
    private static final int SIZE = 1;
    
    private Map<Integer, TreeNode[]> best = new HashMap<>(); // mask -> [node, size]
    private TreeNode[] result = new TreeNode[2];
    private int maxSum = -1;

    public List<TreeNode> findSubtrees(TreeNode root) {
        dfs(root);
        return Arrays.asList(result[0], result[1]);
    }

    private int[] dfs(TreeNode node) {
        if (node == null) return new int[]{0, 0};
        
        int[] left = dfs(node.left);
        int[] right = dfs(node.right);
        
        int mask = left[MASK] | right[MASK] | (1 << (node.val - 'A'));
        int size = left[SIZE] + right[SIZE] + 1;
        
        TreeNode[] existing = best.get(mask);
        if (existing != null) {
            int total = size + existing[SIZE];
            if (total > maxSum) {
                maxSum = total;
                result[0] = existing[MASK];
                result[1] = node;
            }
        }
        
        // Сохраняем наибольшее поддерево
        if (existing == null || size > existing[SIZE]) {
            best.put(mask, new TreeNode[]{node, size});
        }
        
        return new int[]{mask, size};
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один DFS — O(n). HashMap хранит не более n масок. Битовые операции O(1).`,
expl:`Каждое поддерево кодируется 26-битной маской. DFS считает маску и размер снизу вверх. В HashMap храним для каждой маски узел с наибольшим поддеревом — это гарантирует максимальную сумму при совпадении. При каждом совпадении масок обновляем ответ, если сумма больше. Итог: один проход O(n), без повторного обхода.`},

// ===== HASHMAP =====
{id:"hf8",t:"Count Pairs With Absolute Diff K",p:"HashMap",d:"легко",
desc:`Дан массив nums и число k. Посчитать ==количество пар== (i, j), где i < j и |nums[i] - nums[j]| == k.

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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один проход с HashMap: добавляем частоты num−k и num+k — O(n). Карта — O(n) памяти.`,
expl:`Я решаю задачу за один проход с использованием hash map, где храню частоты уже просмотренных элементов.
Идея в том, что для каждого текущего числа num я хочу найти все предыдущие элементы, которые образуют с ним пару с разницей k.
Условие:
|a - b| = k
эквивалентно:
a = b + k  или  a = b - k
Поэтому для текущего num я проверяю:
сколько раз уже встречалось num - k
сколько раз уже встречалось num + k
и добавляю эти количества к ответу. После этого добавляю текущий num в map, чтобы он мог участвовать в парах для следующих элементов.`,
lcSimilar:[{"t":"Number of Pairs With Absolute Difference K","h":"number-of-pairs-with-absolute-difference-k"},{"t":"K-diff Pairs in an Array","h":"k-diff-pairs-in-an-array"}]},

{id:"hf9",t:"LC 350 Intersection of Two Arrays II",p:"HashMap",d:"легко",
desc:`Найти ==пересечение двух массивов с учётом кратности== (каждый элемент в результате появляется столько раз, сколько он встречается в обоих).

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
complexity:`Время: O(n + m), Память: O(min(n, m))`,
complexityExpl:`Частоты первого массива + проход по второму — O(n+m). Карта — O(min(n,m)) памяти.`,
expl:`HashMap хранит частоты nums1. Для каждого элемента nums2: если freq > 0 — добавляем в результат и уменьшаем freq. O(n+m) время, O(min(n,m)) память.`},

{id:"hf10",t:"LC 387. Первый уникальный символ в строке",p:"HashMap",d:"легко",
desc:`Дана строка s. Найти ==индекс первого неповторяющегося символа==. Если такого символа нет — вернуть -1.

Пример:
Ввод: s = "leetcode"
Вывод: 0

Ввод: s = "loveleetcode"
Вывод: 2

Ввод: s = "aabb"
Вывод: -1`,
hint:`Сначала считаем частоты символов, затем вторым проходом ищем первый индекс с частотой 1.`,
code:`class Solution {
    public int firstUniqChar(String s) {
        int[] freq = new int[26];
        for (char c : s.toCharArray()) {
            freq[c - 'a']++;
        }

        for (int i = 0; i < s.length(); i++) {
            if (freq[s.charAt(i) - 'a'] == 1) {
                return i;
            }
        }
        return -1;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Два линейных прохода по строке — O(n). Массив частот на 26 букв латиницы — O(1).`,
expl:`Сначала накапливаем частоты каждого символа. Затем идём по строке слева направо и возвращаем первый индекс, где частота символа равна 1. Если такого индекса нет — возвращаем -1.`,
lcSimilar:[{"n":387,"t":"First Unique Character in a String","h":"first-unique-character-in-a-string"}]},

// ===== SLIDING WINDOW =====
{id:"sw12",t:"Minimum Size Subarray Sum",p:"Sliding Window",d:"средне",
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

        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];

            while (sum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }

        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Скользящее окно: каждый индекс входит/выходит один раз — O(n). Счётчики — O(1) памяти.`,
expl:`Скользящее окно: расширяем правый край, добавляя к сумме. Когда sum >= target — сжимаем слева, обновляя минимальную длину. Каждый элемент добавляется и удаляется один раз → O(n).`,
lcSimilar:[{"t":"209. Minimum Size Subarray Sum","h":"209-minimum-size-subarray-sum"}]},

// ===== WINDOW + DEQUE =====
{id:"swd2",t:"Sliding Window Maximum",p:"Window + Deque",d:"сложно",
desc:`Дан массив nums и ==размер окна k==. Для каждой позиции окна ==вернуть максимум==.

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
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }

            while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {
                deque.pollLast();
            }

            deque.addLast(i);

            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }

        return result;
    }
}`,
complexity:`Время: O(n), Память: O(k)`,
complexityExpl:`Монотонный deque: каждый индекс добавляется/удаляется O(1) раз — O(n). Deque размера O(k) памяти.`,
expl:`Монотонный убывающий дек хранит индексы. Голова = индекс максимума окна. При добавлении нового элемента удаляем из хвоста все меньшие/равные. Удаляем из головы вышедшие за окно. Каждый элемент push/pop один раз → O(n).`},

// ===== TWO POINTERS =====
{id:"tp24",t:"LeetCode 161: One Edit Distance",p:"Two Pointers",d:"средне",
desc:`Проверить, находятся ли две строки на расстоянии ==ровно одной правки== (вставка, удаление или замена одного символа).

Пример:
Ввод: s = "ab", t = "acb" → true (вставка 'c')
Ввод: s = "cab", t = "ad" → false
Ввод: s = "", t = "" → false (0 правок, не 1)
Ввод: s = "a", t = "A" → true (замена)`,
hint:`Если длины равны — ищем ровно одну замену. Если разница 1 — ищем одну вставку. Иначе false.`,
code:`class Solution {
    public boolean isOneEditDistance(String s, String t) {
        int sLen = s.length(), tLen = t.length();
        if (Math.abs(sLen - tLen) > 1) return false;

        // гарантируем что s — всегда более короткая строка
        if (sLen > tLen) return isOneEditDistance(t, s);

        for (int i = 0; i < sLen; i++) {
            if (s.charAt(i) != t.charAt(i)) {
                boolean sameLength = sLen == tLen;
                if (sameLength) {
                    // замена: хвосты после позиции i должны совпасть
                    return s.substring(i + 1).equals(t.substring(i + 1));
                } else {
                    // вставка в s: сдвигаем указатель в t и сравниваем хвосты
                    return s.substring(i).equals(t.substring(i + 1));
                }
            }
        }

        // все символы s совпали — похожи только если t длиннее ровно на 1
        return sLen + 1 == tLen;
    }
}`,
code2:`public boolean isOneEditDistance(String s, String t) {
    int sLen = s.length(), tLen = t.length();
    
    // 1. Быстрая проверка: разница длин не более 1
    if (Math.abs(sLen - tLen) > 1) return false;
    
    // 2. Гарантируем, что s не длиннее t (для упрощения логики)
    if (sLen > tLen) return isOneEditDistance(t, s);
    
    // 3. Ищем первое расхождение символов
    for (int i = 0; i < sLen; i++) {
        if (s.charAt(i) != t.charAt(i)) {
            
            // Случай 1: Одинаковая длина → операция ЗАМЕНЫ
            if (sLen == tLen) {
                // Проверяем, что все остальные символы совпадают
                for (int j = i + 1; j < sLen; j++)
                    if (s.charAt(j) != t.charAt(j)) return false;
            } 
            // Случай 2: Разная длина → операция ВСТАВКИ/УДАЛЕНИЯ
            else {
                // Пропускаем символ в длинной строке (t)
                for (int j = i; j < sLen; j++)
                    if (s.charAt(j) != t.charAt(j + 1)) return false;
            }
            return true;
        }
    }
    
    // 4. Если все символы совпали, но строки разной длины
    return sLen + 1 == tLen;
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один линейный проход с ранним выходом — O(n). Несколько индексов — O(1) памяти.`,
expl:`Если длины равны — при первом расхождении проверяем, что остальные совпадают (замена). Если разница 1 — пропускаем символ в длинной строке (вставка/удаление). O(n).`},

// ===== HASHMAP =====
{id:"tp25",t:"Longest Palindrome Two Letter Words",p:"HashMap",d:"средне",
desc:`Дан массив слов из двух букв. Найти длину ==самого длинного палиндрома==, который можно составить из этих слов.

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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Подсчёт частот пар в HashMap — O(n). Карта и ключи — O(n) памяти.`,
expl:`Для пар (ab, ba): берём min(count) пар, каждая даёт +4. Для палиндромов (aa): пары дают +4, один нечётный можно в центр (+2). O(n) время.`},

// ===== TWO POINTERS =====
{id:"tp26",t:"LC 243 · Shortest Word Distance",p:"Two Pointers",d:"легко",
desc:`Дан массив строк words и два разных слова word1 и word2. Найти минимальную абсолютную разность индексов между любым вхождением word1 и любым вхождением word2.

Пример:
Ввод: words = ["practice","makes","perfect","coding","makes"], word1 = "coding", word2 = "practice"
Вывод: 3

Ввод: words = ["a","b","c","d","b"], word1 = "a", word2 = "b"
Вывод: 1`,
hint:`Один проход: запоминаем последнюю позицию word1 и word2. При обновлении любой — считаем расстояние.`,
code:`class Solution {
    public int shortestDistance(String[] words, String word1, String word2) {
        int pos1 = -1, pos2 = -1;
        int minDist = Integer.MAX_VALUE;

        for (int i = 0; i < words.length; i++) {
            if (words[i].equals(word1)) {
                pos1 = i;
            } else if (words[i].equals(word2)) {
                pos2 = i;
            }

            if (pos1 != -1 && pos2 != -1) {
                minDist = Math.min(minDist, Math.abs(pos1 - pos2));
            }
        }

        return minDist;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход с обновлением позиций двух слов — O(n). Переменные — O(1) памяти.`,
expl:`Один проход: обновляем позицию при нахождении word1 или word2. Если обе позиции известны — считаем расстояние. O(n) время, O(1) память.`,
lcSimilar:[{"t":"LC 243 · Shortest Word Distance","h":"lc-243-shortest-word-distance"}]},

{id:"tp27",t:"LC 821 Shortest Distance to a Character",p:"Two Pointers",d:"легко",
desc:`Дана строка s и символ c (гарантированно есть в s). Для каждой позиции найти ==расстояние до ближайшего вхождения== c.

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
            result[i] = Math.min(result[i], prev - i); //проверяем какое расстояние меньше: справа или слева
        }

        return result;
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Два прохода слева/справа для расстояния до c — O(n). Массив ответа — O(n) памяти.`,
expl:`Два прохода: слева→ записываем расстояние от последнего c. Справа→ обновляем минимумом с расстоянием от ближайшего c справа. O(n) время, O(1) доп. память.`,
lcSimilar:[{"n":238,"t":"Product of Array Except Self","h":"product-of-array-except-self"},{"n":42,"t":"Trapping Rain Water","h":"trapping-rain-water"},{"n":845,"t":"Longest Mountain in Array","h":"longest-mountain-in-array"}]},

{id:"tp28",t:"Product of Array Except Self",p:"Two Pointers",d:"средне",
desc:`Дан массив nums. Вернуть массив result, где result[i] = ==произведение всех элементов кроме nums[i]==.
Без деления, за O(n).

Пример:
Ввод: [1,2,3,4]
Вывод: [24,12,8,6]`,
hint:`Два прохода: накапливай prefix-произведение слева, потом suffix-произведение справа. Умножай на месте.`,
code:`class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        result[0] = 1;
        for (int i = 1; i < n; i++) {
            result[i] = result[i - 1] * nums[i - 1]; // prefix
        }

        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] *= suffix; // домножаем suffix справа
            suffix *= nums[i];
        }

        return result;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Два прохода по массиву — O(n). result не считается доп. памятью (это ответ). Только переменная suffix — O(1).`,
expl:`Для каждого i нужно произведение всего, кроме nums[i]. Делим задачу: prefix[i] = product(0..i-1), suffix[i] = product(i+1..n-1). Первый проход строит prefix в result[], второй — досчитывает suffix на ходу переменной suffix и умножает. Деление не нужно.`,
lcSimilar:[{"n":821,"t":"Shortest Distance to a Character","h":"shortest-distance-to-a-character"},{"n":42,"t":"Trapping Rain Water","h":"trapping-rain-water"},{"n":845,"t":"Longest Mountain in Array","h":"longest-mountain-in-array"}]},

{id:"tp29",t:"LeetCode 42 Trapping Rain Water",p:"Two Pointers",d:"сложно",
desc:`Дан массив высот столбиков. Посчитать ==сколько воды задерживается== после дождя.

Пример:
Ввод: [0,1,0,2,1,0,1,3,2,1,2,1]
Вывод: 6`,
hint:`Два указателя с краёв. Вода в позиции i = min(maxLeft, maxRight) − height[i]. Двигай тот указатель, где высота меньше.`,
code:`class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int maxLeft = 0, maxRight = 0;
        int water = 0;

        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= maxLeft) maxLeft = height[left];
                else water += maxLeft - height[left];
                left++;
            } else {
                if (height[right] >= maxRight) maxRight = height[right];
                else water += maxRight - height[right];
                right--;
            }
        }

        return water;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход двумя указателями — O(n). Только 4 переменные — O(1) памяти.`,
expl:`Уровень воды определяется меньшим из двух ограничивающих столбиков слева и справа.
Вода над позицией i ограничена min(maxLeft, maxRight) − height[i]. 
Два указателя: если левая стенка меньше — правая уже достаточно высока, считаем воду слева и двигаем left. 
Иначе — считаем справа и двигаем right.`,
lcSimilar:[{"t":"LeetCode 42","h":"leetcode-42"}]},

// ===== DYNAMIC PROGRAMMING =====
{id:"tp30",t:"Longest Mountain in Array",p:"Dynamic Programming",d:"средне",
desc:`Найти длину ==самой длинной горы== в массиве. Гора: строго возрастает, затем строго убывает, длина ≥ 3.

Пример:
Ввод: [2,1,4,7,3,2,5]
Вывод: 5 (подмассив [1,4,7,3,2])`,
hint:`Два прохода: up[i] — длина подъёма до i, down[i] — длина спуска от i. Гора там, где up[i]>0 и down[i]>0.`,
code:`class Solution {
    public int longestMountain(int[] arr) {
        int n = arr.length;
        int[] up = new int[n];
        int[] down = new int[n];

        for (int i = 1; i < n; i++)
            if (arr[i] > arr[i - 1]) up[i] = up[i - 1] + 1;

        for (int i = n - 2; i >= 0; i--)
            if (arr[i] > arr[i + 1]) down[i] = down[i + 1] + 1;

        int result = 0;
        for (int i = 0; i < n; i++)
            if (up[i] > 0 && down[i] > 0)
                result = Math.max(result, up[i] + down[i] + 1);

        return result;
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Три прохода по массиву — O(n). Два вспомогательных массива up[] и down[] — O(n) памяти.`,
expl:`up[i] считает сколько шагов строго вверх завершается в i, down[i] — сколько шагов строго вниз начинается в i. Вершина горы — позиция, где оба > 0. Длина горы = up[i] + down[i] + 1 (сама вершина).`,
lcSimilar:[{"n":821,"t":"Shortest Distance to a Character","h":"shortest-distance-to-a-character"},{"n":238,"t":"Product of Array Except Self","h":"product-of-array-except-self"},{"n":42,"t":"Trapping Rain Water","h":"trapping-rain-water"}]},

// ===== TWO POINTERS =====
{id:"tp31",t:"LC 125 Valid Palindrome",p:"Two Pointers",d:"легко",
desc:`Дана строка s. Определить, является ли она ==палиндромом==, если учитывать только буквенно-цифровые символы (без учёта регистра).

Пример:
Ввод: "A man, a plan, a canal: Panama"
Вывод: true

Ввод: "race a car"
Вывод: false`,
hint:`left + right с двух концов. Пропускать небуквенно-цифровые символы. Сравнивать без учёта регистра.`,
code:`class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;

            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }

            left++;
            right--;
        }
        return true;
    }
}`,
code2:`class Solution {
    public boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;
        
        while (left < right) {
            // Пропускаем не-буквенно-цифровые символы слева
            while (left < right && !isAlphaNumeric(s.charAt(left))) {
                left++;
            }
            
            // Пропускаем не-буквенно-цифровые символы справа
            while (left < right && !isAlphaNumeric(s.charAt(right))) {
                right--;
            }
            
            // Сравниваем символы без учёта регистра
            if (toLowerCase(s.charAt(left)) != toLowerCase(s.charAt(right))) {
                return false;
            }
            
            // Двигаем указатели к центру
            left++;
            right--;
        }
        
        return true;
    }
    
    // Проверяем, буква ли это или цифра
    private boolean isAlphaNumeric(char c) {
        return (c >= 'A' && c <= 'Z') ||
               (c >= 'a' && c <= 'z') ||
               (c >= '0' && c <= '9');
    }
    
    // Приводим к нижнему регистру (только буквы, цифры не меняются)
    private char toLowerCase(char c) {
        if (c >= 'A' && c <= 'Z') {
            return (char) (c + 32); // 'A' = 65, 'a' = 97, разница 32
        }
        return c; // уже нижний регистр или цифра
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход двумя указателями — O(n). Никаких дополнительных структур — O(1).`,
expl:`Два указателя с концов, пропускаем не-алфавитные символы. Сравниваем без регистра. O(n) время, O(1) память.`,
lcSimilar:[{"n":680,"t":"Valid Palindrome II","h":"valid-palindrome-ii"}]},

{id:"tp32",t:"LC 167 · Two Sum II - Input Array Is Sorted",p:"Two Pointers",d:"легко",
desc:`Дан ==отсортированный== массив numbers (1-индексация) и target. Найти два числа, дающих в сумме target. Вернуть их индексы.

Пример:
Ввод: numbers = [2,7,11,15], target = 9
Вывод: [1,2]

Ввод: numbers = [2,3,4], target = 6
Вывод: [1,3]`,
hint:`left + right с двух концов. Если sum < target — left++. Если sum > target — right--. Если == target — ответ.`,
code:`class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left + 1, right + 1};
            else if (sum < target) left++;
            else right--;
        }
        return new int[]{-1, -1};
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход — O(n). Только два указателя — O(1).`,
expl:`Отсортированность даёт монотонность суммы: меньше — двигаем левый, больше — правый. Гарантированно находим за O(n).`,
lcSimilar:[{"n":1,"t":"Two Sum","h":"two-sum"},{"n":15,"t":"3Sum","h":"3sum"}]},

{id:"tp33",t:"LC 344 Reverse String",p:"Two Pointers",d:"легко",
desc:`Дан массив символов s. ==Развернуть его in-place== (без дополнительной памяти).

Пример:
Ввод: ['h','e','l','l','o']
Вывод: ['o','l','l','e','h']`,
hint:`left + right с двух концов. Менять местами s[left] и s[right], пока left < right.`,
code:`class Solution {
    public void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char tmp = s[left];
            s[left] = s[right];
            s[right] = tmp;
            left++;
            right--;
        }
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`n/2 свапов — O(n). In-place — O(1).`,
expl:`Классика двух указателей с концов: меняем местами элементы, идём к центру. O(n) время, O(1) память.`,
lcSimilar:[{"n":541,"t":"Reverse String II","h":"reverse-string-ii"}]},

{id:"tp34",t:"LeetCode 26. Remove Duplicates from Sorted Array",p:"Two Pointers",d:"легко",
desc:`Дан ==отсортированный== массив nums. Удалить дубликаты ==in-place==, вернуть количество уникальных элементов k.

Пример:
Ввод: [1,1,2]
Вывод: 2, nums = [1,2,_]

Ввод: [0,0,1,1,1,2,2,3,3,4]
Вывод: 5, nums = [0,1,2,3,4,_,_,_,_,_]`,
hint:`fast + slow. slow — позиция записи, fast — чтение. Если nums[fast] != nums[slow] — записываем.`,
code:`class Solution {
    public int removeDuplicates(int[] nums) {
        // writePointer — куда записываем следующий уникальный элемент
        // readPointer — откуда читаем следующий элемент
        int writePointer = 0;
        
        for (int readPointer = 1; readPointer < nums.length; readPointer++) {
            // Если нашли новый уникальный элемент
            if (nums[readPointer] != nums[writePointer]) {
                writePointer++;                          // двигаем указатель записи
                nums[writePointer] = nums[readPointer];  // записываем уникальный элемент
            }
            // Если дубликат — просто пропускаем (readPointer увеличивается в цикле)
        }
        
        // Количество уникальных элементов = writePointer + 1
        return writePointer + 1;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход — O(n). In-place — O(1).`,
expl:`slow отстаёт от fast: slow фиксирует позицию последнего уникального. Новый уникальный элемент — записываем в slow+1. O(n) время, O(1) память.`,
p2:"Read / Write",
lcSimilar:[{"n":27,"t":"Remove Element","h":"remove-element"},{"n":80,"t":"Remove Duplicates II","h":"remove-duplicates-ii"}]},

{id:"tp35",t:"LC 27 Remove Element",p:"Two Pointers",d:"легко",
desc:`Дан массив nums и число val. Удалить ==in-place== все вхождения val, вернуть количество оставшихся элементов.

Пример:
Ввод: nums = [3,2,2,3], val = 3
Вывод: 2, nums = [2,2,_,_]

Ввод: nums = [0,1,2,2,3,0,4,2], val = 2
Вывод: 5`,
hint:`fast + slow. Если nums[fast] != val — записываем в slow и slow++.`,
code:`class Solution {
    public int removeElement(int[] nums, int val) {
        int slow = 0;
        for (int fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != val) {
                nums[slow] = nums[fast];
                slow++;
            }
        }
        return slow;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход — O(n). In-place — O(1).`,
expl:`slow — курсор записи. Копируем в начало только нужные элементы (не равные val). O(n) время, O(1) память.`,
p2:"Read / Write",
lcSimilar:[{"n":26,"t":"Remove Duplicates","h":"remove-duplicates"},{"n":283,"t":"Move Zeroes","h":"move-zeroes"}]},

{id:"tp36",t:"LC 283 · Move Zeroes",p:"Two Pointers",d:"легко",
desc:`Дан массив nums. Переместить все нули в конец, ==сохранив порядок== остальных элементов. In-place.

Пример:
Ввод: [0,1,0,3,12]
Вывод: [1,3,12,0,0]`,
hint:`fast + slow. Если nums[fast] != 0 — записываем в slow. В конце заполняем хвост нулями.`,
code:`class Solution {
    public void moveZeroes(int[] nums) {
        int slow = 0;
        for (int fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != 0) {
                nums[slow] = nums[fast];
                slow++;
            }
        }
        while (slow < nums.length) {
            nums[slow++] = 0;
        }
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Два прохода — O(n). In-place — O(1).`,
expl:`slow фиксирует позицию записи ненулевых. После прохода всё что осталось (slow..n-1) — нули. O(n) время, O(1) память.`,
p2:"Read / Write",
lcSimilar:[{"n":27,"t":"Remove Element","h":"remove-element"}]},

{id:"tp37",t:"LC 392 · Is Subsequence",p:"Two Pointers",d:"легко",
desc:`Даны строки s и t. Определить, является ли s ==подпоследовательностью== t (символы s встречаются в t в том же порядке, но не обязательно подряд).

Пример:
Ввод: s = "ace", t = "abcde"
Вывод: true

Ввод: s = "aec", t = "abcde"
Вывод: false`,
hint:`Два указателя: i на s, j на t. При совпадении i++. j++ всегда. Если i == s.length() — true.`,
code:`class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0, j = 0;
        while (i < s.length() && j < t.length()) {
            if (s.charAt(i) == t.charAt(j)) i++;
            j++;
        }
        return i == s.length();
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход по t — O(n). Только два указателя — O(1).`,
expl:`Жадно ищем символы s в t. Нашли — сдвигаем i. Прошли всю t — если i достиг конца s, то s — подпоследовательность. O(n) время, O(1) память.`,
lcSimilar:[{"n":792,"t":"Number of Matching Subsequences","h":"number-of-matching-subsequences"}]},

{id:"tp38",t:"LC 680 · Valid Palindrome II",p:"Two Pointers",d:"легко",
desc:`Дана строка s. Можно удалить ==не более одного символа==. Определить, можно ли сделать строку палиндромом.

Пример:
Ввод: "aba"
Вывод: true

Ввод: "abca"
Вывод: true (удалить 'c')

Ввод: "abc"
Вывод: false`,
hint:`left + right. При несовпадении — попробовать пропустить левый или правый. Проверить обе строки.`,
code:`class Solution {
    public boolean validPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right))
                return isPalin(s, left+1, right) || isPalin(s, left, right-1);
            left++;
            right--;
        }
        return true;
    }

    private boolean isPalin(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) return false;
            l++; r--;
        }
        return true;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Основной проход + одна дополнительная проверка — O(n). Только указатели — O(1).`,
expl:`При первом несовпадении пробуем пропустить один символ (левый или правый) и проверяем остаток. Не более одного пропуска — O(n) время.`,
lcSimilar:[{"n":125,"t":"Valid Palindrome","h":"valid-palindrome"}]},

{id:"tp39",t:"Container With Most Water",p:"Two Pointers",d:"средне",
desc:`Дан массив height. Найти два столбца, которые вместе с осью X образуют контейнер с ==максимальным количеством воды==.

Пример:
Ввод: [1,8,6,2,5,4,8,3,7]
Вывод: 49 (столбцы 8 и 7, ширина 7)`,
hint:`left + right. Объём = min(height[l], height[r]) * (r - l). Двигать указатель с меньшей высотой.`,
code:`class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int max = 0;
        while (left < right) {
            int area = Math.min(height[left], height[right]) * (right - left);
            max = Math.max(max, area);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return max;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход — O(n). Только три переменные — O(1).`,
expl:`Объём ограничен меньшей стенкой. Двигая меньшую стенку — единственный шанс найти большее. Двигать большую бессмысленно: ширина уменьшится, а высота не вырастет. O(n) время.`,
lcSimilar:[{"n":42,"t":"Trapping Rain Water","h":"trapping-rain-water"}]},

{id:"tp40",t:"3Sum",p:"Two Pointers",d:"средне",
desc:`Дан массив nums. Найти все уникальные тройки, дающие сумму ==0==.

Пример:
Ввод: [-1,0,1,2,-1,-4]
Вывод: [[-1,-1,2],[-1,0,1]]`,
hint:`Сортировка + фиксировать nums[i], затем left + right на остатке. Пропускать дубликаты.`,
code:`class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            int left = i + 1, right = nums.length - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left+1]) left++;
                    while (left < right && nums[right] == nums[right-1]) right--;
                    left++; right--;
                } else if (sum < 0) left++;
                else right--;
            }
        }
        return res;
    }
}`,
complexity:`Время: O(n²), Память: O(1)`,
complexityExpl:`Сортировка O(n log n) + двойной проход O(n²). Хранение результата не считается — O(1) доп. памяти.`,
expl:`Сортируем, фиксируем i. Для остатка — классические two pointers: sum < 0 → left++, sum > 0 → right--. Пропуск дубликатов гарантирует уникальность. O(n²).`,
lcSimilar:[{"n":167,"t":"Two Sum II","h":"two-sum-ii-input-array-is-sorted"},{"n":16,"t":"3Sum Closest","h":"3sum-closest"},{"n":18,"t":"4Sum","h":"4sum"}]},

{id:"tp41",t:"LeetCode 16. 3Sum Closest",p:"Two Pointers",d:"средне",
desc:`Дан массив nums и target. Найти тройку с суммой, ==ближайшей к target==. Вернуть эту сумму.

Пример:
Ввод: nums = [-1,2,1,-4], target = 1
Вывод: 2 (тройка [-1,2,1])`,
hint:`Сортировка + фиксировать nums[i], left + right. Обновлять closest при |sum - target| < |closest - target|.`,
code:`class Solution {
    public int threeSumClosest(int[] nums, int target) {
        // Сортируем массив - это позволит использовать два указателя
        // и двигать их в зависимости от суммы
        Arrays.sort(nums);
        
        // Инициализируем closest первыми тремя числами
        // (нужно с чем-то сравнивать)
        int closest = nums[0] + nums[1] + nums[2];
        
        // ВНЕШНИЙ ЦИКЛ: фиксируем первый элемент тройки
        // Идем до nums.length - 2, так как нужно место для left и right
        for (int i = 0; i < nums.length - 2; i++) {
            
            // ДВА УКАЗАТЕЛЯ:
            // left - следующий после i элемент
            // right - последний элемент массива
            int left = i + 1;
            int right = nums.length - 1;
            
            // ВНУТРЕННИЙ ЦИКЛ:
            // left и right движутся навстречу друг другу
            // В СУММЕ за все итерации внешнего цикла они проходят O(n) шагов
            while (left < right) {
                
                // Текущая сумма трех элементов
                int sum = nums[i] + nums[left] + nums[right];
                
                // Если текущая сумма ближе к target, чем предыдущая - обновляем closest
                if (Math.abs(sum - target) < Math.abs(closest - target)) {
                    closest = sum;
                }
                
                // Двигаем указатели в зависимости от того, куда нужно изменить сумму
                if (sum < target) {
                    // Сумма слишком маленькая → нужно её увеличить
                    // Для этого двигаем left вправо (к бОльшим числам)
                    left++;
                } else if (sum > target) {
                    // Сумма слишком большая → нужно её уменьшить
                    // Для этого двигаем right влево (к меньшим числам)
                    right--;
                } else {
                    // Точно попали в target! Разница = 0
                    // Лучше быть не может → сразу возвращаем
                    return sum;
                }
            }
        }
        
        // Возвращаем closest - сумму, которая оказалась ближе всех к target
        return closest;
    }
}`,
complexity:`Время: O(n²), Память: O(1)`,
complexityExpl:`Сортировка O(n log n) + two pointers O(n²). O(1) доп. памяти.`,
expl:`Для этой задачи не существует алгоритма лучше, чем O(n²).
Для каждого фиксированного i:
left и right проходят вместе по всем элементам от i+1 до n-1`,
lcSimilar:[{"t":"LeetCode 16. 3Sum Closest","h":"leetcode-16-3sum-closest"}]},

{id:"tp42",t:"4Sum",p:"Two Pointers",d:"средне",
desc:`Дан массив nums и target. Найти все уникальные четвёрки с суммой ==target==.

Пример:
Ввод: nums = [1,0,-1,0,-2,2], target = 0
Вывод: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]`,
hint:`Сортировка + два фиксированных цикла i и j, затем left + right на остатке.`,
code:`class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 3; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            for (int j = i + 1; j < nums.length - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j-1]) continue;
                int left = j + 1, right = nums.length - 1;
                while (left < right) {
                    long sum = (long)nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        res.add(Arrays.asList(nums[i],nums[j],nums[left],nums[right]));
                        while (left < right && nums[left] == nums[left+1]) left++;
                        while (left < right && nums[right] == nums[right-1]) right--;
                        left++; right--;
                    } else if (sum < target) left++;
                    else right--;
                }
            }
        }
        return res;
    }
}`,
complexity:`Время: O(n³), Память: O(1)`,
complexityExpl:`Три вложенных прохода — O(n³). O(1) доп. памяти.`,
expl:`Расширение 3Sum: фиксируем два элемента, на остатке — two pointers. Пропуск дубликатов на каждом уровне. O(n³).`,
lcSimilar:[{"n":15,"t":"3Sum","h":"3sum"},{"n":16,"t":"3Sum Closest","h":"3sum-closest"}]},

{id:"tp43",t:"Sort Colors",p:"Two Pointers",d:"средне",
desc:`Дан массив с числами 0 (красный), 1 (белый), 2 (синий). Отсортировать ==in-place== без sort().

Пример:
Ввод: [2,0,2,1,1,0]
Вывод: [0,0,1,1,2,2]`,
hint:`Dutch National Flag: три указателя low, mid, high. 0 → swap с low, 2 → swap с high, 1 → mid++.`,
code:`class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int tmp = nums[low]; nums[low] = nums[mid]; nums[mid] = tmp;
                low++; mid++;
            } else if (nums[mid] == 2) {
                int tmp = nums[mid]; nums[mid] = nums[high]; nums[high] = tmp;
                high--;
            } else {
                mid++;
            }
        }
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход — O(n). In-place три указателя — O(1).`,
expl:`Dutch National Flag: low..mid-1 — нули, mid..high — единицы (необработанные), high+1..n-1 — двойки. Один проход. O(n) время, O(1) память.`,
lcSimilar:[{"n":148,"t":"Sort List","h":"sort-list"}]},

{id:"tp44",t:"LeetCode 142. Linked List Cycle II",p:"Two Pointers",d:"средне",
desc:`Дан связный список. Найти ==узел, где начинается цикл==. Если цикла нет — вернуть null.
Обычный список (без цикла):
[3] → [2] → [0] → [-4] → null (Конец! Никуда не ведёт)

Пример:
Ввод: head = [3,2,0,-4], pos = 1
Вывод: узел со значением 2`,
hint:`Floyd: slow и fast. При встрече — slow в head, оба по одному шагу. Новая встреча = начало цикла.`,
code:`public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }
        return null;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Два прохода — O(n). Только два указателя — O(1).`,
expl:`Алгоритм Флойда: fast и slow встречаются внутри цикла. После встречи — slow в head, двигаем оба по 1 шагу: встретятся ровно в начале цикла (математически доказуемо). O(n), O(1).`,
lcSimilar:[{"n":141,"t":"Linked List Cycle","h":"linked-list-cycle"},{"n":287,"t":"Find the Duplicate Number","h":"find-the-duplicate-number"}]},

{id:"tp45",t:"Find the Duplicate Number",p:"Two Pointers",d:"средне",
desc:`Дан массив из n+1 чисел, каждое от 1 до n. Ровно одно число дублируется. Найти его ==без изменения массива, O(1) памяти==.

Пример:
Ввод: [1,3,4,2,2]
Вывод: 2

Ввод: [3,1,3,4,2]
Вывод: 3`,
hint:`Floyd: рассматривать массив как связный список (nums[i] → nums[nums[i]]). Найти цикл и его начало.`,
code:`class Solution {
    public int findDuplicate(int[] nums) {
        int slow = nums[0], fast = nums[0];
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Два прохода по списку — O(n). Только два указателя — O(1).`,
expl:`Массив как связный список: индекс i ведёт в nums[i]. Дубликат создаёт цикл. Алгоритм Флойда находит вход в цикл = дублирующее число. O(n), O(1).`,
lcSimilar:[{"n":142,"t":"Linked List Cycle II","h":"linked-list-cycle-ii"}]},

{id:"tp46",t:"Longest Repeating Character Replacement",p:"Two Pointers",d:"средне",
desc:`Дана строка s и число k. Можно заменить ==не более k символов==. Найти длину самой длинной подстроки, состоящей из одного символа.

Пример:
Ввод: s = "AABABBA", k = 1
Вывод: 4`,
hint:`Sliding window. Окно валидно если (right-left+1) - maxCount <= k. maxCount — частота самого частого символа в окне.`,
code:`class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int left = 0, maxCount = 0, result = 0;
        for (int right = 0; right < s.length(); right++) {
            maxCount = Math.max(maxCount, ++count[s.charAt(right) - 'A']);
            while ((right - left + 1) - maxCount > k) {
                count[s.charAt(left) - 'A']--;
                left++;
            }
            result = Math.max(result, right - left + 1);
        }
        return result;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход — O(n). Массив из 26 символов — O(1).`,
expl:`Заменять нужно все символы кроме самого частого. Если замен больше k — сужаем окно. maxCount не уменьшаем (нас интересует максимальное окно). O(n) время, O(1) память.`,
lcSimilar:[{"n":3,"t":"Longest Substring Without Repeating Characters","h":"longest-substring-without-repeating-characters"}]},

{id:"tp47",t:"Subarray Product Less Than K",p:"Two Pointers",d:"средне",
desc:`Дан массив nums и число k. Найти количество ==непрерывных подмассивов==, произведение элементов которых строго меньше k.

Пример:
Ввод: nums = [10,5,2,6], k = 100
Вывод: 8`,
hint:`Sliding window. Расширять right. Если product >= k — сужать left. Каждое валидное окно даёт (right - left + 1) новых подмассивов.`,
code:`class Solution {
    public int numSubarrayProductLessThanK(int[] nums, int k) {
        if (k <= 1) return 0;
        int left = 0, product = 1, count = 0;
        for (int right = 0; right < nums.length; right++) {
            product *= nums[right];
            while (product >= k) {
                product /= nums[left];
                left++;
            }
            count += right - left + 1;
        }
        return count;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход — O(n). Только три переменные — O(1).`,
expl:`Для каждого right — максимальное окно с product < k. Новых подмассивов, заканчивающихся на right: right - left + 1. O(n) время, O(1) память.`,
lcSimilar:[{"n":152,"t":"Maximum Product Subarray","h":"maximum-product-subarray"}]},

{id:"tp48",t:"Boats to Save People",p:"Two Pointers",d:"средне",
desc:`Дан массив people (веса) и limit (грузоподъёмность лодки). В лодке не более 2 человек, суммарный вес ≤ limit. Найти ==минимальное количество лодок==.

Пример:
Ввод: people = [1,2], limit = 3
Вывод: 1

Ввод: people = [3,2,2,1], limit = 3
Вывод: 3`,
hint:`Сортировать. left + right. Если people[l] + people[r] <= limit — оба в лодку, l++. Всегда r--.`,
code:`class Solution {
    public int numRescueBoats(int[] people, int limit) {
        Arrays.sort(people);
        int left = 0, right = people.length - 1, boats = 0;
        while (left <= right) {
            if (people[left] + people[right] <= limit) left++;
            right--;
            boats++;
        }
        return boats;
    }
}`,
complexity:`Время: O(n log n), Память: O(1)`,
complexityExpl:`Сортировка O(n log n), один проход O(n). O(1) доп. памяти.`,
expl:`Самый тяжёлый всегда занимает лодку. Если с ним помещается самый лёгкий — берём обоих. Сортировка + two pointers: O(n log n) время, O(1) память.`,
lcSimilar:[{"n":11,"t":"Container With Most Water","h":"container-with-most-water"}]},

{id:"tp49",t:"Interval List Intersections",p:"Two Pointers",d:"средне",
desc:`Даны два списка интервалов firstList и secondList (каждый отсортирован). Найти ==все пересечения==.

Пример:
Ввод: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
Вывод: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]`,
hint:`Два указателя на два списка. Пересечение = [max(a.start, b.start), min(a.end, b.end)]. Двигать тот, у которого меньший конец.`,
code:`class Solution {
    public int[][] intervalIntersection(int[][] first, int[][] second) {
        List<int[]> res = new ArrayList<>();
        int i = 0, j = 0;
        while (i < first.length && j < second.length) {
            int lo = Math.max(first[i][0], second[j][0]);
            int hi = Math.min(first[i][1], second[j][1]);
            if (lo <= hi) res.add(new int[]{lo, hi});
            if (first[i][1] < second[j][1]) i++;
            else j++;
        }
        return res.toArray(new int[0][]);
    }
}`,
complexity:`Время: O(n+m), Память: O(1)`,
complexityExpl:`Один проход по обоим спискам — O(n+m). Только два указателя — O(1) доп. памяти.`,
expl:`Два указателя: пересечение двух отрезков — max начал до min концов. Интервал с меньшим концом больше не пересечётся с текущим — двигаем его. O(n+m) время.`,
lcSimilar:[{"n":56,"t":"Merge Intervals","h":"merge-intervals"}]},

{id:"tp50",t:"Max Consecutive Ones III",p:"Two Pointers",d:"средне",
desc:`Дан бинарный массив nums и число k. Можно перевернуть ==не более k нулей==. Найти длину самой длинной подпоследовательности из единиц.

Пример:
Ввод: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Вывод: 6`,
hint:`Sliding window. Считать нули в окне. Если нулей > k — сужать left.`,
code:`class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0, zeros = 0, result = 0;
        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) zeros++;
            while (zeros > k) {
                if (nums[left] == 0) zeros--;
                left++;
            }
            result = Math.max(result, right - left + 1);
        }
        return result;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход — O(n). Только три переменные — O(1).`,
expl:`Окно с не более k нулями. Расширяем right, при превышении нулей — сужаем left. Максимальная длина такого окна — ответ. O(n) время, O(1) память.`,
lcSimilar:[{"n":424,"t":"Longest Repeating Character Replacement","h":"longest-repeating-character-replacement"}]},

{id:"tp51",t:"LC 1768 · Merge Strings Alternately",p:"Two Pointers",d:"легко",
desc:`Даны две строки word1 и word2. Составить новую строку, ==поочерёдно беря символы==: сначала из word1, затем из word2. Если одна строка длиннее — дописать остаток.

Пример:
Ввод: word1 = "abc", word2 = "pqr"
Вывод: "apbqcr"

Ввод: word1 = "ab", word2 = "pqrs"
Вывод: "apbqrs"`,
hint:`Два указателя i и j. Поочерёдно добавлять word1[i] и word2[j]. Дописать хвост.`,
code:`class Solution {
    public String mergeAlternately(String word1, String word2) {
        StringBuilder sb = new StringBuilder();
        int p1 = 0, p2 = 0;
        
        while (p1 < word1.length() && p2 < word2.length()) {
            sb.append(word1.charAt(p1++));
            sb.append(word2.charAt(p2++));
        }
        
        // Добавляем остатки (если есть)
        sb.append(word1.substring(p1));
        sb.append(word2.substring(p2));
        
        return sb.toString();
    }
}`,
complexity:`Время: O(n+m), Память: O(n+m)`,
complexityExpl:`Один проход по обеим строкам — O(n+m). StringBuilder — O(n+m) памяти.`,
expl:`Два указателя на две строки. Поочерёдный выбор символов, затем дописываем хвост. O(n+m) время и память.`,
lcSimilar:[{"n":392,"t":"Is Subsequence","h":"is-subsequence"}]},

{id:"tp53",t:"Разность отсортированных массивов",p:"Two Pointers",d:"легко",
desc:`Даны два отсортированных массива nums1 и nums2. Вернуть все ==уникальные элементы nums1, которых нет в nums2==, в порядке неубывания.
БЕЗ ДУБЛИКАТОВ

Пример 1:
nums1 = [1, 2, 3], nums2 = [2, 4, 6]
// Результат: [1, 3]

Пример 2:
nums1 = [1, 2, 3, 3], nums2 = [1, 1, 2, 2]
// Результат: [3]`,
hint:`Дубликаты в nums1 пропускаем. Указатель j по nums2 только увеличиваем: догоняем nums2[j] ≥ nums1[i]; если j вышел за массив или nums2[j] ≠ nums1[i] — элемент только в nums1.`,
code:`import java.util.*;

class Solution {
    public List<Integer> difference(int[] nums1, int[] nums2) {
        List<Integer> result = new ArrayList<>();
        int i = 0, j = 0;

        while (i < nums1.length) {
            if (i > 0 && nums1[i] == nums1[i - 1]) {
                i++;
                continue;
            }

            while (j < nums2.length && nums2[j] < nums1[i]) {
                j++;
            }

            if (j == nums2.length || nums2[j] != nums1[i]) {
                result.add(nums1[i]);
            }

            i++;
        }

        return result;
    }
}`,
complexity:`Время: O(n+m), Память: O(1) доп.`,
complexityExpl:`Индекс i проходит nums1, j по nums2 только растёт — суммарно O(n+m). Результат не считаем за доп. память.`,
expl:`Для каждого первого вхождения значения в nums1 сдвигаем j в nums2 до первого элемента ≥ этого значения. Если такого нет или значение не совпало — число есть только в nums1, добавляем в ответ.`,
lcSimilar:[{"n":2215,"t":"Find the Difference of Two Arrays","h":"find-the-difference-of-two-arrays"},{"n":349,"t":"Intersection of Two Arrays","h":"intersection-of-two-arrays"},{"n":350,"t":"Intersection of Two Arrays II","h":"intersection-of-two-arrays-ii"}]},

{id:"tp54",t:"К ближайших чисел (якорь idx)",p:"Two Pointers",d:"легко",
desc:`Дан массив nums, отсортированный в ==неубывающем порядке==, индекс idx и число k. Нужно найти ==k ближайших к значению nums[idx]== чисел в массиве и вернуть в любом порядке. При равных расстояниях предпочтение отдаётся ==меньшим числам==.

Пример 1:
Ввод: nums = [2,5,5,5,8], idx = 2, k = 4
Вывод: [2,5,5,5]
Объяснение: ответ [2,5,5,5], а не [5,5,5,8], потому что 2 < 8 при |8−5| = |2−5|.

Пример 2:
Ввод: nums = [−100,1,2,5,8,9], idx = 4, k = 2
Вывод: [8,9]

Ограничения:
len(nums) ≥ 1
0 ≤ idx < len(nums)
k ≥ 0

Ожидается, что ответ — новый список, а не модификация nums и не слайс от исходного списка.`,
hint:`Стартуем с nums[idx]. Два указателя l = idx−1 и r = idx+1. На каждом шаге сравниваем расстояния до nums[l] и nums[r]; при равенстве берём слева (меньшее значение).`,
code:`import java.util.*;

class Solution {
    public List<Integer> findNearestNumbers(List<Integer> nums, int idx, int k) {
        if (k == 0) {
            return new ArrayList<>();
        }
        List<Integer> result = new ArrayList<>();
        result.add(nums.get(idx));
        int l = idx - 1;
        int r = idx + 1;
        int ref = nums.get(idx);

        for (int i = 0; i < k - 1; i++) {
            if (r >= nums.size() || (l >= 0 && Math.abs(ref - nums.get(l)) <= Math.abs(ref - nums.get(r)))) {
                result.add(nums.get(l));
                l--;
            } else {
                result.add(nums.get(r));
                r++;
            }
        }
        return result;
    }
}`,
complexity:`Время: O(k), Память: O(k)`,
complexityExpl:`Ровно k−1 итераций расширения от центра, на шаг константная работа — O(k). Новый список длины k — O(k) памяти.`,
expl:`Массив отсортирован, опорное значение ref = nums[idx]. Разносим указатели влево и вправо как у слияния: всегда добавляем конец с меньшим расстоянием до ref; при равенстве — левый (меньший элемент). O(k) время и память.`,
lcSimilar:[{"t":"Find K Closest Elements","h":"find-k-closest-elements"}],
repoSimilar:["tp16","tp15"]},

{id:"tp55",t:"LC 234. Палиндром в связном списке",p:"Two Pointers",d:"легко",
desc:`Дан head односвязного списка. Вернуть true, если список является ==палиндромом==, иначе false.

Пример:
Ввод: head = [1,2,2,1]
Вывод: true

Ввод: head = [1,2]
Вывод: false`,
hint:`slow/fast для середины, развернуть вторую половину, затем посимвольно сравнить значения узлов.`,
code:`class Solution {
    public boolean isPalindrome(ListNode head) {
        // 1. Находим середину (slow/fast)
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // 2. Разворачиваем вторую половину
        ListNode prev = null, curr = slow;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        // 3. Сравниваем две половины
        ListNode left = head, right = prev;
        while (right != null) {
            if (left.val != right.val) return false;
            left = left.next;
            right = right.next;
        }

        return true;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Проходим список для поиска середины, затем для разворота второй половины и сравнения — суммарно O(n). Дополнительные указатели занимают O(1).`,
expl:`Ищем середину двумя указателями. Разворачиваем вторую половину списка in-place. После этого сравниваем первую половину с развёрнутой второй узел к узлу. Если все значения совпали — это палиндром.`,
lcSimilar:[{"n":234,"t":"Palindrome Linked List","h":"palindrome-linked-list"}],
repoSimilar:["tp44","tp2","tp11"]},

{id:"tp56",t:"LC 557. Reverse Words in a String III",p:"Two Pointers",d:"легко",
desc:`Дана строка s. Перевернуть ==символы в каждом слове==, сохраняя порядок слов и пробелы между ними.

Пример:
Ввод: s = "Let's take LeetCode contest"
Вывод: "s'teL ekat edoCteeL tsetnoc"

Ввод: s = "God Ding"
Вывод: "doG gniD"`,
hint:`Идём по символам и на каждом пробеле разворачиваем отрезок текущего слова двумя указателями.`,
code:`class Solution {
    public String reverseWords(String s) {
        char[] arr = s.toCharArray();
        int start = 0;
        for (int i = 0; i <= arr.length; i++) {
            if (i == arr.length || arr[i] == ' ') {
                reverse(arr, start, i - 1);
                start = i + 1;
            }
        }
        return new String(arr);
    }

    private void reverse(char[] arr, int l, int r) {
        while (l < r) {
            char tmp = arr[l];
            arr[l++] = arr[r];
            arr[r--] = tmp;
        }
    }
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один проход для поиска границ слов и локальные развороты суммарно покрывают каждый символ константное число раз — O(n). char[] копия строки занимает O(n) памяти.`,
expl:`Сканируем строку слева направо. Как только встретили пробел или конец массива, разворачиваем текущий диапазон символов слова in-place в char[]. Затем продолжаем со следующего слова.`,
lcSimilar:[{"n":557,"t":"Reverse Words in a String III","h":"reverse-words-in-a-string-iii"}],
repoSimilar:["st5"]},

{id:"tp57",t:"LC 281. Zigzag Iterator",p:"Two Pointers",d:"средне",
desc:`Даны два списка целых чисел v1 и v2. Нужно итерироваться по ним ==поочерёдно==: один элемент из первого, один из второго и так далее.
Если один список закончился, продолжаем брать оставшиеся элементы из другого.

Пример:
Ввод: v1 = [1,2], v2 = [3,4,5,6]
Вывод итератора: [1,3,2,4,5,6]

Ввод: v1 = [1], v2 = []
Вывод итератора: [1]`,
hint:`Храним два Iterator и флаг очереди turn. В next() берём из текущего, если он не пуст, иначе из второго.`,
code:`public class ZigzagIterator {
    private Iterator<Integer> i1, i2;
    private boolean turn; // true = первый список

    public ZigzagIterator(List<Integer> v1, List<Integer> v2) {
        i1 = v1.iterator();
        i2 = v2.iterator();
        turn = i1.hasNext();
    }

    public int next() {
        if ((turn && i1.hasNext()) || !i2.hasNext()) {
            turn = i2.hasNext(); // следующий ход — второму, если есть
            return i1.next();
        } else {
            turn = i1.hasNext();
            return i2.next();
        }
    }

    public boolean hasNext() {
        return i1.hasNext() || i2.hasNext();
    }
}`,
complexity:`Время: O(1) на вызов, Память: O(1)`,
complexityExpl:`Каждый вызов next/hasNext делает константное число проверок и переходов по итераторам. Храним только два итератора и флаг turn — O(1) памяти.`,
expl:`Идея round-robin для двух источников: берём из текущего итератора, если он не пуст, иначе из другого. После взятия переключаем turn только на реально доступный источник.
Follow-up для k списков: вместо флага использовать Queue<Iterator<Integer>> — хранить только непустые итераторы, на next() брать из головы и, если итератор не исчерпан, возвращать его в хвост.`,
p2:"Design / Iterator",
lcSimilar:[{"n":281,"t":"Zigzag Iterator","h":"zigzag-iterator"}],
repoSimilar:["tp51"]},

// ===== INTERVALS SWEEP =====
{id:"iss6",t:"LC 163 · Missing Ranges",p:"Intervals Sweep",d:"легко",
desc:`Дан отсортированный массив уникальных чисел и границы [lower, upper]. Найти все ==пропущенные диапазоны==.

Пример:
Ввод: nums = [0, 1, 3, 50, 75], lower = 0, upper = 99
Вывод: ["2", "4->49", "51->74", "76->99"]

Ввод: nums = [], lower = 1, upper = 1
Вывод: ["1"]`,
hint:`Индекс idx по nums; держим expect — следующее ожидаемое число. Если nums[idx] > expect — formatRange(expect, nums[idx]−1).`,
code:`class Solution {
    public List<String> findMissingRanges(int[] nums, int lower, int upper) {
        List<String> result = new ArrayList<>();
        long expect = lower;
        int idx = 0;
    
        while (idx < nums.length) {
            int currentNum = nums[idx];
            if (currentNum > expect) {
                String missingRange = formatRange(expect, (long) currentNum - 1);
                result.add(missingRange);
            }
            
            expect = (long) currentNum + 1;
            idx++;
        }
        
        if (expect <= upper) {
            result.add(formatRange(expect, upper));
        }
        
        return result;
    }
    
    private String formatRange(long from, long to) {
        if (from == to) {
            return String.valueOf(from);
        }
        return from + "->" + to;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход по nums с expect — O(n). Список строк — O(1) доп. памяти кроме вывода.`,
expl:`Ожидаемое значение expect; при разрыве добавляем диапазон через formatRange (как в Summary Ranges). O(n).`,
diagram:{"type":"multi","steps":[{"structs":[{"type":"int[]","name":"nums","data":[0,1,3,50,75],"active":[1]},{"type":"int","name":"lower","data":"0"},{"type":"int","name":"upper","data":"99"},{"type":"int","name":"idx","data":"1"},{"type":"int","name":"expect","data":"1"},{"type":"String[]","name":"result","data":[]}],"desc":"**expect** — какое число мы ждём следующим в [lower, upper] без «дыры». Обработали **nums[0]=0**: **num > expect** ложь → в result ничего. После итерации: **expect = 1**, **idx = 1**."},{"structs":[{"type":"int[]","name":"nums","data":[0,1,3,50,75],"active":[2]},{"type":"int","name":"lower","data":"0"},{"type":"int","name":"upper","data":"99"},{"type":"int","name":"idx","data":"2"},{"type":"int","name":"expect","data":"2"},{"type":"String[]","name":"result","data":[]}],"desc":"Обработали **nums[1]=1**: дыры нет. **expect = 2**, **idx = 2**."},{"structs":[{"type":"int[]","name":"nums","data":[0,1,3,50,75],"active":[3]},{"type":"int","name":"lower","data":"0"},{"type":"int","name":"upper","data":"99"},{"type":"int","name":"idx","data":"3"},{"type":"int","name":"expect","data":"4"},{"type":"String[]","name":"result","data":["2"]}],"desc":"Только что обработали **nums[2]=3**: **3 > 2** — пропуск **[2, 2]** → **\"2\"**. Теперь **expect = 4**, **idx = 3** (следующий элемент — 50)."},{"structs":[{"type":"int[]","name":"nums","data":[0,1,3,50,75],"active":[4]},{"type":"int","name":"lower","data":"0"},{"type":"int","name":"upper","data":"99"},{"type":"int","name":"idx","data":"4"},{"type":"int","name":"expect","data":"51"},{"type":"String[]","name":"result","data":["2","4->49"]}],"desc":"После **nums[3]=50**: **50 > 4** → **\"4->49\"**. **expect = 51**, **idx = 4** (читаем **75**)."},{"structs":[{"type":"int[]","name":"nums","data":[0,1,3,50,75],"active":[]},{"type":"int","name":"lower","data":"0"},{"type":"int","name":"upper","data":"99"},{"type":"int","name":"idx","data":"5 (конец)"},{"type":"int","name":"expect","data":"76"},{"type":"String[]","name":"result","data":["2","4->49","51->74"]}],"desc":"Обработали **nums[4]=75**: **75 > 51** → **\"51->74\"**. **expect = 76**, **idx = 5** — элементов больше нет."},{"structs":[{"type":"int[]","name":"nums","data":[0,1,3,50,75],"active":[]},{"type":"int","name":"lower","data":"0"},{"type":"int","name":"upper","data":"99"},{"type":"int","name":"idx","data":"5"},{"type":"int","name":"expect","data":"76"},{"type":"String[]","name":"result","data":["2","4->49","51->74","76->99"]}],"desc":"После цикла: **expect (76) ≤ upper (99)** — хвост **[76, 99]** → **\"76->99\"**. Полный **result** совпадает с примером из условия."}]}},

{id:"iss7",t:"LC 228 · Summary Ranges",p:"Intervals Sweep",d:"легко",
desc:`Дан отсортированный массив без дубликатов. Свернуть ==последовательные числа в диапазоны== "a->b".

Пример:
Ввод: [0, 1, 2, 4, 5, 7]
Вывод: ["0->2", "4->5", "7"]

Ввод: [0, 2, 3, 4, 6, 8, 9]
Вывод: ["0", "2->4", "6", "8->9"]`,
hint:`Два указателя: start и i расширяют диапазон последовательных чисел.`,
code:`class Solution {
    public List<String> summaryRanges(int[] nums) {
        List<String> list = new ArrayList<>();
        
        for (int i = 0; i < nums.length; i++) {
            int start = nums[i];
            while (i + 1 < nums.length && nums[i + 1] == nums[i] + 1) {
                i++;
            }
            if (start == nums[i]) {
                list.add(String.valueOf(start));
            } else {
                list.add(start + "->" + nums[i]);
            }
        }
        return list;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Указатель с расширением непрерывных отрезков — O(n). Список строк — O(1) доп. памяти.`,
expl:`Группируем последовательные числа (nums[i+1] == nums[i] + 1). Одиночные — как число, диапазоны — как "start->end". O(n) время, O(1) доп. память.`,
lcSimilar:[{"t":"Summary Ranges","h":"summary-ranges"},{"t":"Missing Ranges","h":"missing-ranges"}],
repoSimilar:["tp8"]},

{id:"iss8",t:"Interval List Intersections",p:"Intervals Sweep",d:"средне",
desc:`Даны два списка ==непересекающихся отсортированных интервалов==. Найти их ==пересечения==.

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
complexity:`Время: O(n + m), Память: O(1)`,
complexityExpl:`Два указателя по спискам интервалов — O(n+m). Указатели — O(1) памяти.`,
expl:`Два указателя по спискам. Пересечение = [max(starts), min(ends)], если lo <= hi. Двигаем указатель, чей интервал заканчивается раньше. O(n+m) время.`},

// ===== PREFIX SUM =====
{id:"ps3",t:"Prefix Common Array",p:"Prefix Sum",d:"средне",
desc:`Даны две перестановки A и B длины n (числа от 1 до n). Найти массив C, где C[i] = ==количество общих чисел в префиксах== A[0..i] и B[0..i].

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
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один цикл с обновлением freq и счётчика общих — O(n). Массивы freq и C — O(n) памяти.`,
expl:`Перестановки содержат числа 1..n по одному разу. freq[v] считает суммарные вхождения. Когда freq == 2 — число встречено в обоих массивах. O(n) время и память.`},

// ===== ONE PASS WITH STATE =====
{id:"sw13",t:"LC 674 · Longest Continuous Increasing Subsequence",p:"One Pass with State",d:"легко",
desc:`Найти длину самой длинной ==непрерывно возрастающей подпоследовательности== (подмассива).

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
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход с curLen — O(n). Несколько переменных — O(1) памяти.`,
expl:`Один проход: если nums[i] > nums[i-1] — увеличиваем текущую длину. Иначе сбрасываем в 1. Отслеживаем максимум. O(n) время, O(1) память.`,
lcSimilar:[{"t":"LC 674 · Longest Continuous Increasing Subsequence","h":"lc-674-longest-continuous-increasing-subsequence"}]},

// ===== SLIDING WINDOW =====
{id:"sw14",t:"LC 643 · Maximum Average Subarray I ",p:"Sliding Window",d:"легко",
desc:`Дан массив nums и число k. Найти ==максимальное среднее== подмассива длиной ровно k.

Пример:
Ввод: nums = [1,12,-5,-6,50,3], k = 4
Вывод: 12.75 (подмассив [12,-5,-6,50], сумма=51, 51/4=12.75)

Ввод: nums = [5], k = 1
Вывод: 5.0`,
hint:`Фиксированное окно длины k. Сдвигаем, добавляя правый и вычитая левый элемент. Следим за максимальной суммой.`,
code:`class Solution {
    public double findMaxAverage(int[] nums, int k) {
        int sum = 0;
        for (int i = 0; i < k; i++) {
            sum += nums[i];
        }

        int maxSum = sum;

        for (int right = k; right < nums.length; right++) {
            sum += nums[right] - nums[right - k];
            maxSum = Math.max(maxSum, sum);
        }

        return (double) maxSum / k;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход по массиву с фиксированным окном — O(n). Только несколько переменных — O(1) памяти.`,
expl:`Фиксированное окно длины k. Инициализируем сумму первых k элементов, затем сдвигаем окно за один проход: прибавляем правый, вычитаем левый. Отслеживаем максимальную сумму, делим на k.`,
lcSimilar:[{"t":"Maximum Average Subarray II","h":"maximum-average-subarray-ii"},{"t":"Minimum Size Subarray Sum","h":"minimum-size-subarray-sum"}],
repoSimilar:["sw15","sw12"],
diagram:{"type":"window","data":[1,12,-5,-6,50,3],"steps":[{"wl":0,"wr":3,"desc":"Окно [1,12,-5,-6], sum=2"},{"wl":1,"wr":4,"desc":"Сдвиг: +50-1=51, sum=51 ✓ max"},{"wl":2,"wr":5,"desc":"Сдвиг: +3-12=42, sum=42"},{"wl":1,"wr":4,"desc":"Ответ: 51/4 = 12.75"}]}},

{id:"sw15",t:"Subarrays of Size K and Average > Threshold",p:"Sliding Window",d:"средне",
desc:`Дан массив nums, число k и порог threshold. Вернуть ==количество подмассивов== длиной k, среднее значение которых строго больше threshold.

Пример:
Ввод: nums = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
Вывод: 3 ([2,5,5], [5,5,5], [5,5,8] — средние 4.0, 5.0, 6.0; строго > 4)

Ввод: nums = [1,1,1,1,1], k = 1, threshold = 0
Вывод: 5`,
hint:`Фиксированное окно длины k. Вместо деления сравниваем sum > threshold * k.`,
code:`class Solution {
    public int numOfSubarrays(int[] arr, int k, int threshold) {
        int sum = 0;
        int count = 0;
        int target = threshold * k;

        for (int i = 0; i < k; i++) {
            sum += arr[i];
        }
        if (sum > target) count++;

        for (int right = k; right < arr.length; right++) {
            sum += arr[right] - arr[right - k];
            if (sum > target) count++;
        }

        return count;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Один проход с фиксированным окном — O(n). Только несколько переменных — O(1) памяти.`,
expl:`Вместо сравнения среднего (sum/k > threshold) умножаем порог: sum > threshold*k — избегаем деления. Фиксированное окно длины k сдвигается за один проход.`,
lcSimilar:[{"t":"Maximum Average Subarray I","h":"maximum-average-subarray-i"},{"t":"Minimum Size Subarray Sum","h":"minimum-size-subarray-sum"}],
repoSimilar:["sw14","sw12"],
diagram:{"type":"window","data":[2,2,2,2,5,5,5,8],"steps":[{"wl":0,"wr":2,"desc":"Окно [2,2,2] sum=6, target=12. 6>12? ✗"},{"wl":1,"wr":3,"desc":"[2,2,2] sum=6. ✗"},{"wl":2,"wr":4,"desc":"[2,2,5] sum=9. ✗"},{"wl":3,"wr":5,"desc":"[2,5,5] sum=12. 12>12? ✗"},{"wl":4,"wr":6,"desc":"[5,5,5] sum=15. ✓ count=1"},{"wl":5,"wr":7,"desc":"[5,5,8] sum=18. ✓ count=2"}]}},

{id:"sw16",t:"Longest Substring Without Repeating Characters",p:"Sliding Window",d:"средне",
desc:`Найти длину ==самой длинной подстроки== без повторяющихся символов.

Пример:
Ввод: s = "abcabcbb"
Вывод: 3 ("abc")

Ввод: s = "bbbbb"
Вывод: 1 ("b")

Ввод: s = "pwwkew"
Вывод: 3 ("wke")`,
hint:`Переменное окно + HashSet. Расширяем вправо. Если символ уже в окне — сжимаем слева до его удаления.`,
code:`class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] lastIndex = new int[128];  // ASCII 0-127
        Arrays.fill(lastIndex, -1);
        
        int left = 0;
        int result = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            
            if (lastIndex[c] >= left) {
                left = lastIndex[c] + 1;
            }
            
            lastIndex[c] = right;
            result = Math.max(result, right - left + 1);
        }
        
        return result;
    }
}`,
code2:`class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> lastIndex = new HashMap<>();
        int left = 0;
        int maxLength = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            
            // Если символ уже был в текущем окне
            if (lastIndex.containsKey(c) && lastIndex.get(c) >= left) {
                // Перемещаем левую границу за пределы предыдущего вхождения
                left = lastIndex.get(c) + 1;
            }
            
            // Обновляем последнюю позицию символа
            lastIndex.put(c, right);
            
            // Обновляем максимальную длину
            maxLength = Math.max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
}`,
complexity:`Время: O(n), Память: O(min(n, m))`,
complexityExpl:`Каждый символ добавляется и удаляется из set не более одного раза — O(n). Set хранит символы текущего окна — O(min(n,m)), где m — размер алфавита.`,
expl:`Скользящее окно: расширяем right. При повторном символе наивно сжимали бы left по одному, но зная последнюю позицию символа можно прыгнуть сразу: left = lastIndex[c] + 1. Прыгаем только вперёд — если lastIndex[c] < left, символ уже вне окна, прыгать не нужно.
Массив int[128] вместо HashMap — O(1) память. Каждый символ обрабатывается один раз — O(n).`,
lcSimilar:[{"t":"Minimum Window Substring","h":"minimum-window-substring"},{"t":"Longest Repeating Character Replacement","h":"longest-repeating-character-replacement"}],
repoSimilar:["sw1","sw2","sw7","sw17"],
diagram:{"type":"window","data":["a","b","c","a","b","c","b","b"],"steps":[{"wl":0,"wr":2,"desc":"[a,b,c] — все уникальны, len=3"},{"wl":0,"wr":3,"desc":"Добавляем 'a' — повтор! Сжимаем"},{"wl":1,"wr":3,"desc":"Удалили 'a', окно [b,c,a], len=3"},{"wl":1,"wr":4,"desc":"Добавляем 'b' — повтор! Сжимаем"},{"wl":2,"wr":4,"desc":"Окно [c,a,b], len=3"},{"wl":4,"wr":6,"desc":"Окно [a,b,c], len=3. Ответ: 3"}]}},

{id:"sw17",t:"Подстроки без повторов — число пар (i, j)",p:"Sliding Window",d:"средне",
desc:`Дана строка s. Требуется найти ==количество пар индексов (i, j)== таких, что 0 ≤ i ≤ j < s.length() и все символы в подстроке s[i..j] (включительно) различны (в подстроке нет повторов).

Пример 1:
Ввод: s = "a"
Вывод: 1

Пример 2:
Ввод: s = "aba"
Вывод: 5
Объяснение: подходят подстроки "a", "ab", "b", "ba", "a" — пять пар (i, j).`,
hint:`Два указателя и HashSet: расширяем правую границу, пока символы уникальны. Для текущего окна [l..r] все подстроки, начинающиеся в l и заканчивающиеся в l..r, валидны — их (r−l+1). Затем сдвигаем l.`,
code:`class Solution {
    public int countingPairs(String s) {
        int cnt = 0;
        Set<Character> window = new HashSet<>();
        int l = 0;
        int r = -1;

        while (l < s.length()) {
            while (r + 1 < s.length() && !window.contains(s.charAt(r + 1))) {
                window.add(s.charAt(r + 1));
                r++;
            }
            cnt += r - l + 1;
            window.remove(s.charAt(l));
            l++;
        }
        return cnt;
    }
}`,
code2:`public long countSubstrings(String s) {
    int[] lastSeen = new int[128];
    Arrays.fill(lastSeen, -1);
    
    long count = 0;
    int left = 0;
    
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        left = Math.max(left, lastSeen[c] + 1);
        lastSeen[c] = right;
        count += (right - left + 1);
    }
    
    return count;
}`,
complexity:`Время: O(n), Память: O(min(n, |Σ|))`,
complexityExpl:`Каждый индекс входит в окно и выходит из него не более одного раза — O(n) по времени. В множестве не больше уникальных символов алфавита — O(min(n, |Σ|)) памяти.`,
expl:`Максимально расширяем окно вправо без повторов. Для фиксированного l любая подстрока s[l..k] при l ≤ k ≤ r уже уникальна по построению — ровно (r−l+1) штук. Сдвигаем l и повторяем.`,
lcSimilar:[{"t":"Longest Substring Without Repeating Characters","h":"longest-substring-without-repeating-characters"}],
repoSimilar:["sw16"],
diagram:{"type":"window","data":["a","b","a"],"steps":[{"wl":0,"wr":1,"desc":"Окно [a,b], вклад +(r−l+1)=2"},{"wl":1,"wr":2,"desc":"После сдвига l: [b,a], вклад +2"},{"wl":2,"wr":2,"desc":"Окно [a], вклад +1. Итого 5"}]}},

// ===== MATH / SIMULATION =====
{id:"ms6",t:"Умножение строк",p:"Math / Simulation",d:"средне",
desc:`Даны два неотрицательных числа в виде строк. Вернуть их произведение в виде строки. Нельзя использовать BigInteger или встроенное ==умножение строк==.

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
complexity:`Время: O(m·n), Память: O(m+n)`,
complexityExpl:`Вложенные циклы по парам цифр — O(m·n). Массив result[m+n] — O(m+n) памяти.`,
expl:`Умножение столбиком: произведение цифр num1[i] и num2[j] попадает в позиции [i+j] и [i+j+1]. Обработка переноса встроена. Ведущие нули удаляются. O(m×n) время.`},

{id:"ms7",t:"LC 415. Сложение строк",p:"Math / Simulation",d:"легко",
desc:`Даны два неотрицательных целых числа num1 и num2 в виде строк. Вернуть их ==сумму в виде строки==.
Нельзя использовать BigInteger и нельзя напрямую конвертировать строки в числа.

Пример:
Ввод: num1 = "11", num2 = "123"
Вывод: "134"

Ввод: num1 = "456", num2 = "77"
Вывод: "533"

Ввод: num1 = "0", num2 = "0"
Вывод: "0"`,
hint:`Идём справа налево, складываем цифры и перенос carry. Результат собираем в StringBuilder и в конце разворачиваем.`,
code:`class Solution {
    public String addStrings(String num1, String num2) {
        StringBuilder sb = new StringBuilder();
        int i = num1.length() - 1;
        int j = num2.length() - 1;
        int carry = 0;

        while (i >= 0 || j >= 0 || carry > 0) {
            int a = i >= 0 ? num1.charAt(i--) - '0' : 0;
            int b = j >= 0 ? num2.charAt(j--) - '0' : 0;
            int sum = a + b + carry;
            sb.append(sum % 10);
            carry = sum / 10;
        }

        return sb.reverse().toString();
    }
}`,
complexity:`Время: O(max(n, m)), Память: O(max(n, m))`,
complexityExpl:`Один проход по цифрам справа налево с переносом — O(max(n,m)). StringBuilder хранит итоговую строку длины до max(n,m)+1 — O(max(n,m)).`,
expl:`Складываем числа как в столбик: берём текущие цифры справа, прибавляем carry, пишем младший разряд в результат и обновляем carry. Так как цифры добавляются с конца, в финале разворачиваем StringBuilder.`,
lcSimilar:[{"n":415,"t":"Add Strings","h":"add-strings"}],
repoSimilar:["ms6"]},

// ===== TWO POINTERS =====
{id:"ya1",t:"Неточный поиск",p:"Two Pointers",d:"легко",
desc:`Дана строка text и строка pattern. Найти ==первую позицию== в text, где pattern встречается с не более чем ==k несовпадениями== (остальные символы совпадают точно).

Пример 1:
Ввод: text = "abcdef", pattern = "axc", k = 1
Вывод: 0  (позиция 0: a·c совпадают, b≠x — одно несовпадение)

Пример 2:
Ввод: text = "abcdef", pattern = "xyz", k = 1
Вывод: -1  (везде > 1 несовпадения)

Пример 3:
Ввод: text = "aabbcc", pattern = "ab", k = 0
Вывод: 1  (точное совпадение на позиции 1)

Ограничения:
- 0 ≤ k < pattern.length`,
hint:`Внешний цикл по позициям в text. Внутренний цикл по pattern — считаем несовпадения с ранним выходом при превышении k. O(n·m).`,
code:`class Solution {
    public int fuzzySearch(String text, String pattern, int k) {
        int n = text.length(), m = pattern.length();

        for (int i = 0; i <= n - m; i++) {
            int mismatches = 0;

            for (int j = 0; j < m; j++) {
                if (text.charAt(i + j) != pattern.charAt(j)) {
                    mismatches++;
                    if (mismatches > k) break;
                }
            }

            if (mismatches <= k) return i;
        }

        return -1;
    }
}`,
complexity:`Время: O(n·m), Память: O(1)`,
complexityExpl:`Внешний цикл O(n), внутренний O(m) с ранним выходом — O(n·m) в худшем случае. Только счётчики — O(1) памяти.`,
expl:`Для каждой стартовой позиции i в text сравниваем посимвольно с pattern. Считаем несовпадения; если k превышен — прерываем внутренний цикл. При mismatches ≤ k — возвращаем i. O(n·m) время, O(1) память.`},

// ===== SLIDING WINDOW =====
{id:"ya2",t:"Лучшее место на парковке",p:"Sliding Window",d:"средне",
desc:`Дан массив spots, где spots[i] = 1 — ==занятое место==, spots[i] = 0 — ==свободное==. Нужно выбрать свободное место так, чтобы ==расстояние до ближайшей занятой машины== было ==максимальным==. Вернуть это максимальное расстояние.
Важно: ==гарантировано== есть хотя бы одно свободное и хотя бы одно занятое место.

Пример 1:
Ввод: spots = [0,1,0,0,0,1,0,1,0]
Вывод: 2
Объяснение: лучшее место — индекс 3. Слева ближайшая машина на индексе 1 (расстояние 2), справа — на индексе 5 (расстояние 2). Минимум = 2. Для остальных свободных мест минимальное расстояние меньше.

Пример 2:
Ввод: spots = [0,0,0,1,0,1]
Вывод: 3
Объяснение: лучшее место — индекс 0. Машин слева нет, справа ближайшая на индексе 3 (расстояние 3).`,
hint:`Отслеживаем lastOccupied = -1. При каждой занятой позиции i: если это первая занятая — расстояние = i (левый край). Иначе — (i − lastOccupied) / 2. После цикла проверяем правый край: n − 1 − lastOccupied.`,
code:`class Solution {
    public int maxDistToClosest(int[] spots) {
        int n = spots.length;
        int maxDist = 0;
        int lastOccupied = -1;
        
        for (int i = 0; i < n; i++) {
            if (spots[i] == 1) {
                if (lastOccupied == -1) {
                    // Левый край: расстояние от начала до первой занятой позиции
                    maxDist = i;
                } else {
                    // Между двумя занятыми: оптимально сесть посередине
                    maxDist = Math.max(maxDist, (i - lastOccupied) / 2);
                }
                lastOccupied = i;
            }
        }
        
        // Правый край: расстояние от последней занятой позиции до конца
        maxDist = Math.max(maxDist, n - 1 - lastOccupied);
        
        return maxDist;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Каждый индекс посещается константное число раз при движении l и r — O(n). Только несколько целых — O(1) доп. памяти.`,
expl:`Свободные места разбиты на непрерывные блоки нулей. У левого или правого края оптимально встать в край блока — расстояние до ближайшей единицы равно длине блока. Между двумя единицами оптимум в середине: минимальное из двух расстояний максимизируется как ⌈длина/2⌉, что для целых длин совпадает с (r−l+2)/2.`,
lcSimilar:[{"n":849,"t":"Maximize Distance to Closest Person","h":"maximize-distance-to-closest-person"}]},

// ===== TWO POINTERS =====
{id:"ya3",t:"Сложение графиков",p:"Two Pointers",d:"средне",
desc:`Даны два массива nums1 и nums2, каждый — список пар [время, значение]. Нужно ==сложить два графика== в один и вернуть итоговый график в виде списка пар [время, сумма значений], ==отсортированный по времени==.

Между точками значение графика ==не меняется== (ступень): на каждом времени из объединения множеств меток берётся последняя заданная величина для каждого графика.

Пример 1:
Ввод: nums1 = [[3,1],[1,2]], nums2 = [[2,3],[4,2]]
Вывод: [[1,2],[2,5],[3,4],[4,3]]

Ограничения:
len(nums1) ≥ 0, len(nums2) ≥ 0`,
hint:`Отсортируй оба списка по времени. Два указателя: на каждом шаге выбери минимальное из двух текущих времён, обнови «текущее» значение у графика, если его точка совпала с этим временем, добавь в ответ [время, сумма текущих значений].`,
code:`import java.util.*;

public class Solution {
    public List<List<Integer>> merge(List<List<Integer>> nums1, List<List<Integer>> nums2) {
        nums1.sort(Comparator.comparingInt(p -> p.get(0)));
        nums2.sort(Comparator.comparingInt(p -> p.get(0)));

        int p1 = 0;
        int p2 = 0;
        int currentValue1 = 0;
        int currentValue2 = 0;
        List<List<Integer>> result = new ArrayList<>();

        while (p1 < nums1.size() || p2 < nums2.size()) {
            boolean has1 = p1 < nums1.size();
            boolean has2 = p2 < nums2.size();

            int time1 = has1 ? nums1.get(p1).get(0) : Integer.MAX_VALUE;
            int time2 = has2 ? nums2.get(p2).get(0) : Integer.MAX_VALUE;
            int time = Math.min(time1, time2);

            if (time1 == time) {
                currentValue1 = nums1.get(p1).get(1);
                p1++;
            }
            if (time2 == time) {
                currentValue2 = nums2.get(p2).get(1);
                p2++;
            }

            result.add(List.of(time, currentValue1 + currentValue2));
        }

        return result;
    }
}`,
complexity:`Время: O(n log n + m log m), Память: O(n + m)`,
complexityExpl:`Сортировка — O(n log n) и O(m log m). Слияние указателями — O(n+m). Список результата — O(n+m) пар.`,
expl:`Каждый график — кусочно-постоянная функция времени. После сортировки сливаем уникальные моменты времени как при merge двух отсортированных последовательностей: при совпадении времени с очередной точкой графика обновляем его текущее значение и сдвигаем указатель; в ответ всегда пишем сумму двух текущих значений.`,
lcSimilar:[{"n":1229,"t":"Meeting Scheduler","h":"meeting-scheduler"}]},

// ===== SLIDING WINDOW =====
{id:"ya4",t:"UserStatistics: окно k мс и ≥ limit запросов",p:"Sliding Window",d:"средне",
desc:`Есть последовательность запросов пользователей, каждый запрос — это пара (time, userId), запросы всегда приходят в отсортированном по времени порядке.
Нужно быстро отвечать: сколько за последние k мс было пользователей, которые сделали >= limit запросов.
k > 0, limit > 0.`,
starter:`class UserStatistics {
    private long limit = 0;
    private long k = 0;

    public UserStatistics(int k, int limit) {

    }

    public void event(long now, long userId) {
        // place your code here
    }

    public int robotCount(long now) {
        // place your code here
    }
}`,
hint:`Скользящее окно по времени + карта частот userId. Для интервью сначала удобно заполнить шаблон методов из условия, затем добавить очередь событий и удаление устаревших элементов.`,
code:`import java.util.*;

class UserStatistics {
    private final long k;
    private final long limit;
    private final Deque<Event> queue = new ArrayDeque<>();
    private final Map<Long, Integer> freq = new HashMap<>();
    private int hotCount = 0;
    
    // Вспомогательный класс для читаемости
    private static class Event {
        long time;
        long userId;
        
        Event(long time, long userId) {
            this.time = time;
            this.userId = userId;
        }
    }
    
    public UserStatistics(int k, int limit) {
        this.k = k;
        this.limit = limit;
    }
    
    public void event(long now, long userId) {
        // 1. Сначала удаляем устаревшие события
        expire(now);
        
        // 2. Добавляем новое событие
        queue.addLast(new Event(now, userId));
        int count = freq.merge(userId, 1, Integer::sum);
        
        // 3. Обновляем счётчик "горячих" пользователей
        if (count == limit) {
            hotCount++;
        }
    }
    
    public int robotCount(long now) {
        expire(now);
        return hotCount;
    }
    
    private void expire(long now) {
        long windowStart = now - k;
        while (!queue.isEmpty() && queue.peekFirst().time < windowStart) {
            Event oldest = queue.pollFirst();
            long userId = oldest.userId
            int count = freq.get(userId);
            if (count == limit) {
                hotCount--;
            }
            
            if (count == 1) {
                freq.remove(userId);
            } else {
                freq.put(userId, count - 1);
            }
        }
    }
}

`,
complexity:`Время: амортизированно O(1) на вызов, Память: O(число событий в окне)`,
complexityExpl:`Каждое событие один раз попадает в дек и один раз из него удаляется — за всю последовательность линейно по числу событий.`,
expl:`Скользящее окно по времени: дек хранит события в порядке прихода. Карта — сколько запросов у каждого userId внутри окна. hotCount увеличивается, когда частота пользователя впервые становится >= limit, и уменьшается, когда после удаления устаревших событий она падает ниже limit.`,
lcSimilar:[{"n":362,"t":"Design Hit Counter","h":"design-hit-counter"}],
repoSimilar:["ya2"],
diagram:{"type":"userstats","now":1000,"from":400,"k":600,"limit":3,"users":[{"name":"A","color":"#22d3ee","events":[100,350,600,900]},{"name":"B","color":"#94a3b8","events":[200,500,700]},{"name":"C","color":"#d9f943","events":[400,550,750,950]}],"inWindowCount":[3,2,4],"robots":["A","C"]}},

{id:"ya5",t:"LC 849 · Maximize Distance to Closest Person",p:"Sliding Window",d:"средне",
desc:`Места в кинотеатре расположены в один ряд. Новый зритель хочет сесть так, чтобы ==расстояние до ближайшего занятого места== было ==максимальным==.
Дан массив seats:
- seats[i] = 1 — место занято
- seats[i] = 0 — место свободно
Гарантируется, что есть хотя бы одно свободное место и хотя бы одно занятое.
Нужно вернуть максимальную возможную дистанцию до ближайшего зрителя.

Пример:
Ввод: seats = [1,0,0,0,1]
Вывод: 2

Ввод: seats = [1,0,1,0,0,1]
Вывод: 2

Ввод: seats = [1,0,1,0]
Вывод: 1`,
hint:`Идём по блокам нулей. Для блока в начале/конце ответ равен длине блока. Для блока между единицами — (длина + 1) / 2.`,
code:`class Solution {
    public int maxDistToClosest(int[] seats) {
        int n = seats.length;
        int maxDist = 0;
        int lastOccupied = -1;
        
        for (int i = 0; i < n; i++) {
            if (seats[i] == 1) {
                if (lastOccupied == -1) {
                    // Левый край: расстояние до первой занятой позиции
                    maxDist = i;
                } else {
                    // Между двумя занятыми: расстояние до ближайшего = (i - lastOccupied) / 2
                    maxDist = Math.max(maxDist, (i - lastOccupied) / 2);
                }
                lastOccupied = i;
            }
        }
        
        // Правый край: расстояние от последней занятой позиции до конца
        maxDist = Math.max(maxDist, n - 1 - lastOccupied);
        
        return maxDist;
    }
}`,
complexity:`Время: O(n), Память: O(1)`,
complexityExpl:`Каждый индекс посещается константное число раз при одном проходе по массиву.`,
expl:`Группируем подряд идущие нули в блоки. Крайние блоки дают полный размер как расстояние до ближайшей единицы. Внутренний блок между единицами даёт максимум в середине: ceil(len/2).`,
lcSimilar:[{"n":849,"t":"Maximize Distance to Closest Person","h":"maximize-distance-to-closest-person"}],
repoSimilar:["ya2"]},

// ===== TWO POINTERS =====
{id:"ya6",t:"RLE с валидацией строки A-Z",p:"Two Pointers",d:"средне",
desc:`Дана строка, содержащая только заглавные буквы английского алфавита (A-Z).
Нужно реализовать RLE-сжатие:
- если символ встречается один раз — оставляем символ как есть;
- если символ повторяется несколько раз — после символа пишем количество повторений.

Пример:
Ввод: "AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB"
Вывод: "A4B3C2XYZD4E3F3A6B28"

Если входная строка недопустима (null/пустая или содержит символ не из A-Z), нужно выбросить ошибку.`,
hint:`Проверь валидность строки, затем одним проходом считай длину каждого блока одинаковых символов и добавляй в ответ букву + count (если count > 1).`,
code:`
public String rle(String s) {
    if (s == null) {
        return "";
    }
    
    if (s.isEmpty()) {
        return "";
    }
    
    StringBuilder result = new StringBuilder(s.length()); // резервируем место
    char prevChar = s.charAt(0);
    int count = 1;
    
    for (int i = 1; i < s.length(); i++) {
        char currChar = s.charAt(i);
        
        if (!isValidChar(currChar)) {
            throw new IllegalArgumentException(
                "Invalid character at position " + i + ": " + currChar
            );
        }
        
        if (currChar == prevChar) {
            count++;
        } else {
            // Записываем предыдущий блок
            appendBlock(result, prevChar, count);
            
            // Начинаем новый блок
            prevChar = currChar;
            count = 1;
        }
    }
    
    // Последний блок
    appendBlock(result, prevChar, count);
    
    return result.toString();
}

private void appendBlock(StringBuilder sb, char c, int count) {
    sb.append(c);
    if (count > 1) {
        sb.append(count);
    }
}

private boolean isValidChar(char c) {
    return Character.isLetter(c); // или другое условие
}`,
complexity:`Время: O(n), Память: O(n)`,
complexityExpl:`Один линейный проход по строке. Дополнительная память — под результирующую строку.`,
expl:`Группируем одинаковые соседние символы в блоки. Для каждого блока добавляем символ и, если длина блока больше 1, его размер. Перед этим валидируем каждый символ и бросаем ошибку при нарушении формата.`,
lcSimilar:[{"n":443,"t":"String Compression","h":"string-compression"}],
repoSimilar:["ya5"]},

// ===== SLIDING WINDOW =====
{id:"ya7",t:"Поиск подстроки с точностью до перестановки",p:"Sliding Window",d:"средне",
desc:`Дан текст T и строка S. Нужно найти такую подстроку S' в T, что ==S' является перестановкой S== (анаграммой), и вернуть начальный индекс этой подстроки.
Если подходящей подстроки нет — вернуть -1.

Проверка:
T = "a", S = "a" => 0
T = "abcd", S = "aaa" => -1
T = "abcd", S = "cbd" => 1
T = "abcdda", S = "bcdd" => 1`,
hint:`Скользящее окно длины |S| + массив/карта частот. Сравнивай частоты окна и S при сдвиге на 1.`,
code:` public int findPermutation(String t, String s) {
      if (s.length() > t.length()) return -1;

      int[] freq = new int[26];
      for (char c : s.toCharArray()) freq[c - 'a']++;

      int len = s.length();
      int need = s.length();
      int left = 0;

      for (int right = 0; right < t.length(); right++) {
          // правый символ входит в окно
          int inIdx = t.charAt(right) - 'a';
          if (freq[inIdx] > 0) need--;
          freq[inIdx]--;

          // окно переросло len — левый выходит
          if (right - left + 1 > len) {
              int outIdx = t.charAt(left) - 'a';
              if (freq[outIdx] >= 0) need++;
              freq[outIdx]++;
              left++;
          }

          if (need == 0) return left;
      }

      return -1;
  }`,
complexity:`Время: O(n * A), Память: O(A), где A = 256`,
complexityExpl:`Окно двигается O(n) раз, на каждом шаге сравниваем частоты размера A. При фиксированном алфавите это близко к O(n).`,
expl:`Подстрока длины |S| может быть перестановкой S только при равенстве частот символов. Поддерживаем частоты в окне длины |S|, на каждом сдвиге добавляем правый символ и убираем левый. При равенстве массивов частот возвращаем старт окна.`,
lcSimilar:[{"n":438,"t":"Find All Anagrams in a String","h":"find-all-anagrams-in-a-string"}],
repoSimilar:["sw2","ya6"]},

{id:"ya8",t:"Кратчайшая подстрока, покрывающая алфавит",p:"Sliding Window",d:"средне",
desc:`Даны 2 строки text и alphabet.
Нужно вернуть самую короткую подстроку text, в которой каждый символ из alphabet встречается хотя бы один раз. В подстроке могут быть и другие символы.
Если подходящих подстрок несколько одинаковой длины, вернуть ту, что начинается левее. Если подходящей подстроки нет — вернуть пустую строку.

Примеры:
searchPangram("abacaba", "bc") => "bac"
searchPangram("bacb", "bc") => "cb"
searchPangram("abbc", "ac") => "abbc"
searchPangram("abacaba", "bcd") => ""`,
hint:`Скользящее окно: расширяем right, считаем покрытые символы alphabet, затем сжимаем left пока покрытие полное. Поддерживаем лучший (минимальный) отрезок.`,
code:`public String searchPangram(String text, String alphabet) {
    // Словарь для подсчёта символов алфавита в текущем окне
    Map<Character, Integer> window = new HashMap<>();
    for (char c : alphabet.toCharArray()) window.put(c, 0);

    int required = alphabet.length();      // сколько уникальных символов нужно покрыть
    int covered = 0;                       // сколько уже покрыто
    int bestLeft = -1, bestLen = Integer.MAX_VALUE;  // лучший найденный отрезок
    int left = 0;                          // левая граница окна

    for (int right = 0; right < text.length(); right++) {
        // Расширяем окно вправо
        char c = text.charAt(right);
        if (window.containsKey(c)) {
            window.put(c, window.get(c) + 1);
            if (window.get(c) == 1) covered++;  // новый символ полностью покрыт
        }

        // Пока окно покрывает все символы — пробуем сжать его слева
        while (covered == required) {
            // Обновляем лучший ответ
            int len = right - left + 1;
            if (len < bestLen) {
                bestLen = len;
                bestLeft = left;
            }
            // Удаляем левый символ
            char leftChar = text.charAt(left);
            if (window.containsKey(leftChar)) {
                window.put(leftChar, window.get(leftChar) - 1);
                if (window.get(leftChar) == 0) covered--;  // потеряли покрытие
            }
            left++;
        }
    }

    return bestLeft == -1 ? "" : text.substring(bestLeft, bestLeft + bestLen);
}`,
code2:`public String searchPangram(String text, String alphabet) {
    int[] count = new int[128];
    for (char c : alphabet.toCharArray()) {
        count[c]++;
    }
    
    int required = alphabet.length();
    int left = 0;
    int minLen = Integer.MAX_VALUE;
    int bestLeft = -1;
    
    for (int right = 0; right < text.length(); right++) {
        char c = text.charAt(right);
        
        // Уменьшаем счетчик для нужных символов
        if (count[c] > 0) {
            required--;
        }
        count[c]--;
        
        // Когда все символы найдены
        while (required == 0) {
            // Обновляем ответ
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                bestLeft = left;
            }
            
            // Удаляем левый символ
            char leftChar = text.charAt(left);
            count[leftChar]++;
            
            if (count[leftChar] > 0) {
                required++;
            }
            
            left++;
        }
    }
    
    return bestLeft == -1 ? "" : text.substring(bestLeft, bestLeft + minLen);
}`,
complexity:`Время: O(n), Память: O(A), где A = размер алфавита (здесь 256)`,
complexityExpl:`Каждый указатель (left/right) проходит строку не более одного раза. Доп. память — массивы частот/флагов фиксированного размера.`,
expl:`Поддерживаем окно [left..right]. Когда окно покрывает все символы alphabet, сжимаем его слева до потери покрытия и обновляем лучший ответ. Первое найденное окно минимальной длины автоматически будет левейшим.`,
lcSimilar:[{"n":76,"t":"Minimum Window Substring","h":"minimum-window-substring"}],
repoSimilar:["sw2","ya7"]},

// ===== TWO POINTERS =====
{id:"ya9",t:"Ближайший митинг",p:"Two Pointers",d:"средне",
desc:`Даны два списка свободных временных окон двух сотрудников: nums1 и nums2, где каждое окно представлено как [start, end] — начало и конец свободного периода в минутах. Гарантируется, что start < end. Длина окна равна end - start. Оба списка отсортированы по возрастанию начала интервала, интервалы внутри одного списка не пересекаются.

Нужно найти ==первое по времени== окно длины duration, когда оба сотрудника свободны. Вернуть его как [start, end]. Если такого окна нет — вернуть пустой массив.

Пример 1:
Ввод: nums1 = [[0, 30], [60, 90]], nums2 = [[10, 40], [80, 100]], duration = 15
Вывод: [10, 25]

Пример 2:
Ввод: nums1 = [[5, 20], [50, 70]], nums2 = [[0, 10], [55, 80]], duration = 10
Вывод: [55, 65]

Пример 3:
Ввод: nums1 = [[0, 5], [20, 25]], nums2 = [[10, 15], [30, 35]], duration = 5
Вывод: []`,
hint:`Два указателя по двум спискам интервалов. На каждом шаге смотрите пересечение текущих окон; если его длины хватает на duration, ответ — отрезок длины duration от левого конца пересечения. Иначе сдвиньте указатель у того интервала, который ==раньше заканчивается==.`,
code:`import java.util.*;

class Solution {
    public List<Integer> findMeetingTime(List<List<Integer>> nums1, List<List<Integer>> nums2, int duration) {
        int i = 0, j = 0;

        while (i < nums1.size() && j < nums2.size()) {
            int start1 = nums1.get(i).get(0), end1 = nums1.get(i).get(1);
            int start2 = nums2.get(j).get(0), end2 = nums2.get(j).get(1);

            int intersection = Math.min(end1, end2) - Math.max(start1, start2);

            if (intersection >= duration) {
                int start = Math.max(start1, start2);
                return Arrays.asList(start, start + duration);
            }

            if (end1 < end2) {
                i++;
            } else {
                j++;
            }
        }

        return new ArrayList<>();
    }
}`,
complexity:`Время: O(n + m), Память: O(1)`,
complexityExpl:`Каждый указатель проходит свой список не более одного раза — O(n+m). Храним только индексы и константное число целых — O(1).`,
expl:`Пересечение двух текущих свободных отрезков — [max(start1,start2), min(end1,end2)]. Если его длина ≥ duration, самое раннее подходящее окно начинается в max(start1,start2). Если нет — отбрасываем интервал с меньшим end: он уже не даст более раннего пересечения с текущим партнёром.`,
lcSimilar:[{"n":1229,"t":"Meeting Scheduler","h":"meeting-scheduler"}],
repoSimilar:["ya1"]},

// ===== QUEUE / DESIGN =====
{id:"ya10",t:"LC 362. Design Hit Counter",p:"Queue / Design",d:"средне",
desc:`Реализовать счётчик хитов за последние 5 минут (300 секунд).
Методы:
- hit(timestamp): зафиксировать хит в секунду timestamp
- getHits(timestamp): вернуть число хитов за последние 300 секунд (включая текущую секунду)

Пример:
hit(1), hit(2), hit(3), getHits(4) -> 3
hit(300), getHits(300) -> 4
getHits(301) -> 3`,
hint:`Базовый вариант: очередь timestamp. В getHits удаляем все значения, где timestamp - head >= 300.`,
code:`public class HitCounter {
    private Queue<Integer> queue;

    public HitCounter() {
        queue = new LinkedList<>();
    }

    public void hit(int timestamp) {
        queue.offer(timestamp);
    }

    public int getHits(int timestamp) {
        while (!queue.isEmpty() && timestamp - queue.peek() >= 300) {
            queue.poll();
        }
        return queue.size();
    }
}`,
complexity:`Время: O(1) hit, O(n) getHits, Память: O(n)`,
complexityExpl:`В базовой реализации очередь хранит все хиты из окна. hit — одна вставка O(1). getHits может удалить много устаревших элементов, в худшем O(n).`,
expl:`Храним метки времени хитов в очереди. На getHits вычищаем из головы всё, что старше окна 300 секунд, после чего размер очереди и есть ответ.
Follow-up при очень большом количестве хитов в одну секунду: использовать 300 бакетов (times[300], hits[300]) по индексу timestamp % 300. При коллизии секунды перезаписываем бакет. Тогда hit — O(1), getHits — O(300)=O(1), память O(1).`,
p2:"Locked / Premium",
lcSimilar:[{"n":362,"t":"Design Hit Counter","h":"design-hit-counter"}],
repoSimilar:["ya4"]}

];
