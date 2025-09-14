import * as fs from "fs";
import * as readline from "readline";
import { z } from "zod";

/* In this supplemental task, I decided to go one step further
and try to represent several structures via Schema.*/

/* First, we will try to represent regular linked lists. Lists,
unlike arrays, can't be called on indexes, instead they are recursively defined
and iterated with the use of pointers.*/

/*At first, we will try to make a listNodeValue type, which can be either whatever
type the caller wants, since lists are not limited
by one type.*/

const listNodeValue = z.union([z.string(), z.number(), z.boolean()]);

/* Now, we have two choices. First one is to represent a linked list through
addresses/pointers (so hex numbers). It will be simpler but also very unreliable
since the address might be to wrong tile and will still pass. Also, we need to include 
null to represent empty lists. */

const listSchemaHex = z.object({
    value: listNodeValue,
    next: z.union([z.hex(), z.null()])
})

/* The harder but more correct method would be to define the list recursively.
For this, we need to first define the recursive type, and then, define the schema
as the recursive type*/

type ListNode = {
    value: z.infer<typeof listNodeValue>
    next: ListNode | null
}

const listSchemaRecursive: z.ZodType<ListNode> = z.object({
    value: listNodeValue,
    next: z.lazy(() => listSchemaRecursive).nullable()
})

/* This was, we now have the basic list that we can construct of any elements.
Now, we will use it as a basic building block for a few more structures. 
First, double-linked lists:*/

type DoubleListNode = {
    value: z.infer<typeof listNodeValue>
    next: DoubleListNode | null
    prev: DoubleListNode | null
}


const listDoubleSchema: z.ZodType<DoubleListNode> = z.object({
    value: listNodeValue,
    next: z.lazy(() => listDoubleSchema).nullable(),
    prev: z.lazy(() => listDoubleSchema).nullable()
})

/*The same thing can be further expanded for all sorts of structure on graphs,
like heaps, trees, cursors etc.*/


/*Finally, I will try to construct one of my favorite concepts 
in programming - a stream structure. I will try doing this
by using z.function to check for function correctness*/

const streamValue = z.number()
// can really be any other type, but doing union here will be sketchy.

type stream = {
    value: z.infer<typeof streamValue>,
    next: stream
}


const calculateNextFunction = z.function({
    input: [streamValue],
    output: streamValue
});

const NextElem = calculateNextFunction.implement((input) => {
    // TypeScript knows input is a number!
    return input * input;
});

const streamSchema: z.ZodType<stream> = z.object({
    value: streamValue,
    next: z.lazy(() => streamSchema)
})

/*This is the best I came up with, i wanted to try to restrict the next value by using
function NextElem, but it is either impossible or I can't find how to do it.*/



