;; props to http://norstrulde.org/ilge10/
(set! qq
      (lambda (x)
        (if (consp x)
            (if (eq 'qq-unquote (car x))
                (cadr x)
                (if (eq 'quasiquote (car x))
                    (qq (qq (cadr x)))
                    (if (consp (car x))
                        (if (eq 'qq-splice (caar x))
                            (list 'append (cadar x) (qq (cdr x)))
                            (list 'cons (qq (car x)) (qq (cdr x))))
                        (list 'cons (qq (car x)) (qq (cdr x))))))
            (list 'quote x))))

(defmacro quasiquote (thing)
  (qq thing))

;;;; let the show begin

(defmacro defun (name args . body)
  `(%set-function-name (set! ,name (lambda ,args ,@body)) ',name))

(defmacro when (pred . body)
  `(if ,pred (progn ,@body)))

(defmacro unless (pred . body)
  `(if ,pred nil (progn ,@body)))

(defun mapcar (func list)
  (when list
    (cons (func (car list)) (mapcar func (cdr list)))))

(defun foreach (list func)
  (when list
    (func (car list))
    (foreach (cdr list) func)))

(defmacro let (defs . body)
  `((lambda ,(mapcar (lambda (x)
                       (if (listp x)
                           (car x)
                           x)) defs)
      ,@body)
    ,@(mapcar (lambda (x)
                (if (listp x)
                    (cadr x))) defs)))

(defmacro let* (defs . body)
  (if defs
      `(let (,(car defs))
         (let* ,(cdr defs)
           ,@body))
      `(progn ,@body)))

(defmacro labels (defs . body)
  `(let ,(mapcar (lambda (x) (car x)) defs)
     ,@(mapcar (lambda (x)
                 `(set! ,(car x) (%set-function-name
                                  (lambda ,(cadr x) ,@(cddr x))
                                  ',(car x)))) defs)
     ,@body))

(defmacro flet (defs . body)
  `(let ,(mapcar (lambda (x)
                   `(,(car x) (%set-function-name
                               (lambda ,(cadr x) ,@(cddr x))
                               ',(car x)))) defs)
     ,@body))

(defmacro or exps
  (when exps
    (let ((x (gensym "OR")))
      `(let ((,x ,(car exps)))
         (if ,x ,x (or ,@(cdr exps)))))))

(defmacro and exprs
  (if exprs
      (let ((x (gensym "AND")))
        `(let ((,x ,(car exprs)))
           (when ,x
             ,(if (cdr exprs) `(and ,@(cdr exprs)) x))))
      t))

(defmacro cond cases
  (if cases
      `(if ,(caar cases)
           (progn ,@(cdar cases))
           (cond ,(cdr cases)))))

(defmacro call/cc (func)
  `(,func (c/c)))

(defmacro with-cc (name . body)
  `((lambda (,name) ,@body) (c/c)))

(defun member (item list)
  (if list
      (if (eq item (car list))
          list
          (member item (cdr list)))))

(defmacro case (expr . cases)
  (let ((vexpr (gensym "CASE")))
    `(let ((,vexpr ,expr))
       ,(labels ((recur (cases)
                        (when cases
                          (if (listp (caar cases))
                              `(if (member ,vexpr ',(caar cases))
                                   (progn ,@(cdar cases))
                                   ,(recur (cdr cases)))
                              (if (and (not (cdr cases))
                                       (or (eq (caar cases) 'otherwise)
                                           (eq (caar cases) t)))
                                  `(progn ,@(cdar cases))
                                  `(if (eq ,vexpr ',(caar cases))
                                       (progn ,@(cdar cases))
                                       ,(recur (cdr cases))))))))
                (recur cases)))))

(defun macroexpand (form)
  (if (and (consp form)
           (symbolp (car form))
           (%macrop (car form)))
      (macroexpand (macroexpand-1 form))
      form))

(defun macroexpand-all (form)
  (if (consp form)
      (let ((form (macroexpand form)))
        (mapcar macroexpand-all form))
      form))

