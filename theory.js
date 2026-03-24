const THEORY = {
  'Trees / BFS': {
    icon: '🌳',
    title: 'BFS по уровням дерева',
    desc: 'Обход дерева в ширину — по уровням, с помощью очереди.',
    code: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> queue = new ArrayDeque<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> level = new ArrayList<>();

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();

            level.add(node.val);  

            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }

        result.add(level);        
    }
    return result;
}`
  },
  'Trees / DFS': {
    icon: '🌲',
    title: 'DFS обход дерева',
    desc: 'Обход дерева в глубину — рекурсивно или со стеком.',
    code: `void dfs(TreeNode node) {
    if (node == null) return;

    // Preorder: обработка ДО детей
    process(node);

    dfs(node.left);

    // Inorder: обработка МЕЖДУ детьми (для BST)

    dfs(node.right);

    // Postorder: обработка ПОСЛЕ детей
}`
  },
  'Sliding Window': {
    icon: '🪟',
    title: 'Скользящее окно',
    desc: 'Два указателя образуют окно, которое расширяется/сжимается.',
    code: `int left = 0;
for (int right = 0; right < n; right++) {
    // Расширяем окно: добавляем arr[right]
    add(arr[right]);

    while (needShrink()) {
        // Сжимаем окно: убираем arr[left]
        remove(arr[left]);
        left++;
    }

    // Обновляем результат
    result = Math.max(result, right - left + 1);
}`
  },
  'SW + String': {
    icon: '🔤',
    title: 'Окно + частоты символов',
    desc: `Скользящее окно с массивом частот для поиска анаграмм/подстрок.

<div style="background:rgba(124,58,237,0.15);border-left:3px solid #7c3aed;padding:10px 12px;border-radius:8px;margin:12px 0">
<div style="color:#a78bfa;font-weight:600;margin-bottom:6px">💡 Ключевая идея — знак freq[c]:</div>
<div style="color:#c4b5fd">• freq[c] > 0 → символ <b>нужен</b> (был в t, ещё не покрыт)</div>
<div style="color:#c4b5fd">• freq[c] = 0 → символ покрыт ровно</div>
<div style="color:#c4b5fd">• freq[c] < 0 → символ <b>лишний</b> (не было в t, или взяли больше)</div>
</div>

Символы НЕ из t начинают с 0 → уходят в минус и <b style="color:#a78bfa">никогда не влияют на needCount</b>.`,
    code: `public List<Integer> findAnagrams(String s, String t) {
    List<Integer> result = new ArrayList<>();
    if (s.length() < t.length()) return result;

    // ШАГ 1: ЧАСТОТНЫЙ МАССИВ
    // freq[c] > 0  → символ НУЖЕН (из t, ещё не покрыт)
    // freq[c] = 0  → символ покрыт / не был в t
    // freq[c] < 0  → символ ЛИШНИЙ (взяли больше или не из t)
    int[] freq = new int[128];
    for (char c : t.toCharArray()) {
        freq[c]++;  // изначально freq > 0 только для символов из t
    }

    // ШАГ 2: СЧЁТЧИКИ
    int needCount = t.length();  // сколько символов ещё нужно
    int windowSize = t.length(); // фиксированный размер окна

    // ШАГ 3: СКОЛЬЗЯЩЕЕ ОКНО
    for (int right = 0; right < s.length(); right++) {

        // 3.1. Добавляем правый символ
        char rightChar = s.charAt(right);
        if (freq[rightChar] > 0) needCount--;  // был нужен → покрыт
        freq[rightChar]--;  // уменьшаем (может уйти в минус = лишний)

        // 3.2. Удаляем левый символ (когда окно полное)
        if (right >= windowSize) {
            char leftChar = s.charAt(right - windowSize);
            freq[leftChar]++;  // возвращаем символ
            if (freq[leftChar] > 0) needCount++;  // снова нужен
        }

        // 3.3. Проверяем анаграмму
        if (needCount == 0) {
            result.add(right - windowSize + 1);
        }
    }
    return result;
}`
  },
  'Two Pointers': {
    icon: '👆',
    title: 'Два указателя',
    desc: 'Два указателя движутся по массиву/строке навстречу или в одном направлении.',
    code: `// Навстречу друг другу
int left = 0, right = n - 1;
while (left < right) {
    if (condition) {
        left++;
    } else {
        right--;
    }
}

// В одном направлении (fast/slow)
int slow = 0;
for (int fast = 0; fast < n; fast++) {
    if (keep(arr[fast])) {
        arr[slow++] = arr[fast];
    }
}`
  },
  'Window + Deque': {
    icon: '📊',
    title: 'Окно + монотонный дек',
    desc: 'Скользящее окно с двумя деками для отслеживания min/max.',
    code: `Deque<Integer> maxD = new ArrayDeque<>(); // убывающий
Deque<Integer> minD = new ArrayDeque<>(); // возрастающий

for (int right = 0; right < n; right++) {
    // Поддерживаем монотонность
    while (!maxD.isEmpty() && nums[maxD.peekLast()] <= nums[right])
        maxD.pollLast();
    maxD.addLast(right);

    while (!minD.isEmpty() && nums[minD.peekLast()] >= nums[right])
        minD.pollLast();
    minD.addLast(right);

    // Сжимаем если нарушено условие
    while (nums[maxD.peekFirst()] - nums[minD.peekFirst()] > limit) {
        left++;
        if (maxD.peekFirst() < left) maxD.pollFirst();
        if (minD.peekFirst() < left) minD.pollFirst();
    }
}`
  },
  'HashMap': {
    icon: '🗂️',
    title: 'HashMap / Частоты',
    desc: 'Хеш-таблица для подсчёта частот или группировки.',
    code: `Map<Key, Value> map = new HashMap<>();

// Подсчёт частот
for (int x : arr) {
    map.merge(x, 1, Integer::sum);
    // или
    map.put(x, map.getOrDefault(x, 0) + 1);
}

// Группировка
map.computeIfAbsent(key, k -> new ArrayList<>()).add(value);`
  },
  'Linked List': {
    icon: '🔗',
    title: 'Связный список',
    desc: 'Fast/Slow указатели, dummy-узел для упрощения.',
    code: `// Fast/Slow для поиска середины или цикла
ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}

// Dummy для упрощения удаления
ListNode dummy = new ListNode(0);
dummy.next = head;
// ... работаем ...
return dummy.next;`
  },
  'Backtracking': {
    icon: '🔙',
    title: 'Перебор с откатом',
    desc: 'Рекурсивный перебор всех вариантов с отсечением.',
    code: `void backtrack(State state, List<Result> result) {
    if (isComplete(state)) {
        result.add(copy(state));
        return;
    }

    for (Choice choice : getChoices(state)) {
        if (!isValid(choice)) continue;  // отсечение

        state.apply(choice);      // делаем выбор
        backtrack(state, result); // рекурсия
        state.undo(choice);       // откат
    }
}`
  },
  'Binary Search': {
    icon: '🔍',
    title: 'Бинарный поиск',
    desc: 'Поиск в отсортированном массиве за O(log n).',
    code: `// Поиск левой границы (first >= target)
int lo = 0, hi = n;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] >= target) {
        hi = mid;
    } else {
        lo = mid + 1;
    }
}
return lo;`
  },
  'Greedy': {
    icon: '🎯',
    title: 'Жадный алгоритм',
    desc: 'На каждом шаге выбираем локально оптимальное решение.',
    code: `// Пример: максимум непересекающихся интервалов
Arrays.sort(intervals, (a, b) -> a[1] - b[1]); // по концу

int count = 0, end = Integer.MIN_VALUE;
for (int[] interval : intervals) {
    if (interval[0] >= end) {
        count++;
        end = interval[1];
    }
}`
  }
};
