package com.aloha.todo.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.todo.domain.Pagination;
import com.aloha.todo.domain.Todos;
import com.aloha.todo.service.TodoService;
import com.github.pagehelper.PageInfo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/todos")
@CrossOrigin("*")
public class TodoController {
  
    @Autowired
    private TodoService todoService;

    @GetMapping()
    public ResponseEntity<?> getAllTodo(
        @RequestParam(value = "page", defaultValue = "1", required = false) int page,
        @RequestParam(value = "size", defaultValue = "10", required = false) int size
    ) {
        try {
            PageInfo<Todos> pageInfo = todoService.list(page,size);
            Pagination pagination = new Pagination();
            pagination.setPage(page);
            pagination.setSize(size);
            pagination.setTotal(pageInfo.getTotal());
            List<Todos> list = pageInfo.getList();
            Map<String, Object> response = new HashMap<>();
            response.put("list", list);
            response.put("pagination", pagination);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getOneTodo(@PathVariable("id") String id) {
        try {
            Todos todo = todoService.selectById(id);
            return new ResponseEntity<>(todo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping()
    public ResponseEntity<?> createTodo(@RequestBody Todos todo) {
        try {
            boolean result = todoService.insert(todo);
            if(result)
                return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping()
    public ResponseEntity<?> updateTodo(@RequestBody Todos todo) {
        try {
            boolean result = false;
            if(todo.getId()==null)
                result = todoService.updateAll();
            else
                result = todoService.updateById(todo);
            if(result)
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping({"","/{id}"})
    public ResponseEntity<?> destroy(@PathVariable(value="id",required=false) String id) {
        try {
            boolean result = false;
            if(id.equals("null"))
                result = todoService.deleteAll();
            else
                result = todoService.deleteById(id);
            if(result)
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            else
                return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
